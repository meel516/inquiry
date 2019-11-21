//import React from 'react'
import { isContactCenter, createCommunity, containContactCenter } from './community-services'
import convertToISODate from '../utils/convert-to-iso-date'
import { ObjectMappingService } from './Types'
import ServerError from '../models/server-error'
import AppError from '../models/app-error'
import { get } from 'lodash'

import createProspectNeedsRequest from '../mappers/create-prospect-needs-request'

// business logic ------
class SalesAPIService {

  constructor() {
    this.log = new Logger();
  }

  createApiUri(api) {
    return window.encodeURI(`${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/${api}`)
  }

  async getLeadById({guid, leadId}) {
    if (guid) {
      return await this.getLeadByGuid(guid)
    }
    if (leadId) {
      return await this.getLeadByLeadId(leadId)
    }
  }

  async getLeadByGuid(guid) {
    const leadUrl = this.createApiUri(`leads/guid/${guid}`);
    return await this.getLeadByUrl(leadUrl);
  }

  // TODO: need to build this out, so that system can fetch lead by Id not just guid
  async getLeadByLeadId(leadId) {
    const leadUrl = this.createApiUri(`leads/${leadId}`)
    return await this.getLeadByUrl(leadUrl);
  }

  async retrieveLeadDataForContactId(contactId) {
    const endpoint = this.createApiUri(`lead/contact/${contactId}`);
    const output = await this.createFetch(endpoint);
    return ObjectMappingService.buildLeadDataResponseForContactId(output);
  }

  async getLeadByUrl(uri) {
    let salesLead = await this.createFetch(uri);
    if (salesLead) {
      const lead = ObjectMappingService.createLead(salesLead);

      if (lead && lead.leadId) {
        const { prospect } = lead;
        if (prospect) {
          const { contactId } = prospect;
          lead.currentSituation = prospect.currentSituation

          let influencers = [] 
          try {
            // Fetch influencer(s)
            const inflUrl = this.createApiUri(`influencers/${contactId}`)
            influencers = await this.createFetch(inflUrl);
          } 
          catch(e) {
            influencers = null
          }

          // Determine if we load the page with or without influencers.
          if (influencers && influencers.length > 0) {
            let influencer = influencers.find(function (influencer) {
              return (influencer.primary === true && influencer.active === true);
            });
            lead.influencer = ObjectMappingService.createInfluencer(influencer);
            if (lead.influencer) {
              let tmpGender = get(lead, 'influencer.gender');
              if (tmpGender) {
                lead.callerType = tmpGender;
              } else {
                lead.callerType = '';
              }
            }
          }
          else {
            lead.influencer = prospect
            let tmpGender = get(lead, 'prospect.gender');
            if (tmpGender) {
              lead.callerType = tmpGender;
            } else {
              lead.callerType = '';
            }

            lead.prospect = ObjectMappingService.createEmptyContact();
          }

          const secondPersonUrl = this.createApiUri(`secondperson/${lead.leadId}/byprimary`)
          let secondPerson = await this.createFetch(secondPersonUrl);
          if (get(secondPerson, 'salesLead.salesContact')) {
            const { salesLead: { salesContact } } = secondPerson
            lead.secondPerson = ObjectMappingService.createContact(salesContact);
            lead.secondPerson.selected = true
          }

          if (get(secondPerson, 'salesLead.leadId')) {
            lead.secondPerson.leadId = get(secondPerson, 'salesLead.leadId');
          }
        }
      }
      return lead;
    }
    // TODO: do we create an empty lead knowning that the system cannot find the lead? or alert the user?
    return ObjectMappingService.createEmptyLead();
  }

  /**
   * Submits an influencer to the server api
   * @param {object} influencer the influencer request
   * @returns the influencer id
   */
  async submitInfluencer(influencer) {
    const inflUrl = this.createApiUri('influencer');
    if (influencer) {
      let response = await fetch(inflUrl, {
        method: 'POST', mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(influencer),
      })
      const salesResponse = await response.json();
      if (response.status === 201) {
        return salesResponse.objectId;
      }
      throw new ServerError(response.status, salesResponse.message);
    }
  }

  /**
  * Submits notes to the server.
  * @param {number} coid the lead id used to associate the note
  * @param {note} notes the note object which contains all form notes
  */
  async submitNotes(coid, notes, user) {
    const noteUrl = this.createApiUri('leads/note');

    for (let [key, value] of Object.entries(notes)) {
      console.log(`Note: ${key}`);
      if (value && value.trim().length > 0) {
        let noteRequest = ObjectMappingService.createNoteRequest(coid, value, user);
        fetch(noteUrl, {
          method: 'POST', mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(noteRequest),
        })
          .then(res => res.json())
          .catch(err => console.log(err))
      }
    }
  }

  async submitProspectNeeds(coid, lead, user) {
    const prospectNeedsUrl = this.createApiUri('leads/prospectneed')

    let prospectNeedsRequest = createProspectNeedsRequest(coid, lead, user);
    if (prospectNeedsRequest) {
      fetch(prospectNeedsUrl, {
        method: 'POST', mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prospectNeedsRequest),
      })
        .then(res => res.json())
        .catch(err => console.log(err))
    }
  }

  async checkServerStatus() {
    const pingUrl = this.createApiUri(`echo`);

    const payload = { message: 'test' }
    try {
      const hres = await this._createPOST(pingUrl, payload)
      if (hres.status === 200) {
        const response = await hres.json();
        if (response.message === 'test') {
          return true;
        }
      }
      throw new ServerError(hres.status, 'Server responded with wrong status code.')
    }
    catch (err) {
      throw new ServerError(500, 'Server is not responding.')
    }
  }

  async _createPOST(url, payload) {
    return fetch(url, {
      method: 'POST', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }

  async submitSecondPerson(secondPersonRequest) {
    if (secondPersonRequest) {
      const secondPersonUrl = this.createApiUri('secondperson');
      fetch(secondPersonUrl, {
        method: 'POST', mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(secondPersonRequest),
      })
        .then(res => res.json())
        .catch(err => console.log(err))
    }
  }

  async submitEloquaRequest(eloquaRequest) {
    const eloquaExternalUrl = this.createApiUri('inquiryForm/eloqua')

    console.log("eloquarequest is: " + JSON.stringify(eloquaRequest));

    fetch(eloquaExternalUrl, {
      method: 'POST', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eloquaRequest),
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  async submitProspect(lead, community, user) {
    const prospect = ObjectMappingService.createProspectRequest(lead, community, user);
    return await this.sendProspect(prospect);
  }

  async sendAddCommunityRequest(request) {
    const coidUrl = this.createApiUri('communities')
    let response = await fetch(coidUrl, {
      method: 'POST', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })
    const salesResponse = response.json();
    if (response.status === 201) {
      const { objectId } = salesResponse;
      return objectId;
    }
    throw new ServerError({ status: response.status, message: response.message, entity: 'community' });
  }

  async sendProspect(prospectRequest) {
    const leadUrl = this.createApiUri('prospect')

    // Check if this is an add or update and process accordingly.
    let response;
    if (prospectRequest && !prospectRequest.leadId) {
      // Add - call the POST
      response = await fetch(leadUrl, {
        method: 'POST', mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prospectRequest)
      })
    } else {
      // Update - call the PUT
      response = await fetch(leadUrl, {
        method: 'PUT', mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prospectRequest)
      })
    }

    const salesResponse = await response.json();
    if (response.status === 200 || response.status === 201) {
      const { objectId } = salesResponse;
      prospectRequest.leadId = objectId

      return prospectRequest;
    }
    throw new ServerError({ status: response.status, message: response.message, entity: 'prospect' });
  }

  /**
  * Processes the submission of the contact center to the sales system based upon
  * input from the Connection Center Application.
  * 
  * @param {lead} lead the form lead object
  * @param {Community} community an object representing the contact center
  */
  async processContactCenter(lead, community, user) {
    const salesLead = await this.submitProspect(lead, community, user)
    let leadId = lead.leadId = salesLead.leadId

    if (salesLead.inquirerType !== 'PROSP' || lead.influencer.contactId !== null) {
      if (salesLead.inquirerType !== 'PROSP' && lead.reasonForCall) {
        // Set "Reason for Call" to influencer interest reason.
        lead.influencer.interestReasonId = lead.reasonForCall;
      }

      const influencer = ObjectMappingService.createInfluencerRequest(leadId, lead.influencer, lead.callerType, user);
      const influencerId = await this.submitInfluencer(influencer);
      lead.influencer.influencerId = influencerId
    }

    const notes = lead.notes
    if (notes) {
      await this.submitNotes(leadId, notes, user);
    }

    const careType = lead.careType
    if (careType) {
      await this.submitProspectNeeds(leadId, lead, user);
    }

    const secondPerson = lead.secondPerson;
    if (secondPerson && secondPerson.selected) {
      const secondPersonRequest = ObjectMappingService.createSecondPersonRequest(leadId, lead.secondPerson, user);
      await this.submitSecondPerson(secondPersonRequest);
    }

    return leadId;
  }

  /**
   * Create a all applicable COIs, tying it to the prospect that was already created.
   * In addition, this API call will also create applicable follow up activities.
   * 
   * @param {lead} the lead information from the form
   * @param {communities} the communities in which to create new COIs
   * @param {user} user the sales contact from SMS
   */
  async processCommunities(lead, communities, user) {
    let addCommunityRequest = ObjectMappingService.createAddCommunityRequest(lead, communities, user);
    return await this.sendAddCommunityRequest(addCommunityRequest);
  }

  async retrieveInfluencer(leadId) {
    const influencerUrl = this.createApiUri(`leads/${leadId}/influencer`)

    // already returning json from this fetch
    const influencer = await this.createFetch(influencerUrl);
    return influencer;
  }

  async retrieveProspect(leadId) {
    const prospectUrl = this.createApiUri(`leads/${leadId}/prospect`)

    // already returning json from this fetch
    const prospect = await this.createFetch(prospectUrl)
    return prospect;
  }

  async handleNewInquiryForm(lead, communities, user) {
    const communityList = [...communities];

    // IF zero/many community is selected always assume Contact Center community
    let leadId = null;
    try {
      if (!containContactCenter(communities)) {
        let community = createCommunity();
        community.communityId = 225707
        leadId = await this.processContactCenter(lead, community, user);
      }
      else {
        let contactCenter;
        communityList.map((community) => {
          if (isContactCenter(community)) {
            contactCenter = community;
            return null;
          }
          return community;
        });
        if (contactCenter != null) {
            leadId = await this.processContactCenter(lead, contactCenter, user);
          }
        }
    }
    catch (err) {

    }

    if (leadId == null) {
      // throw new error due to lead was not created due to errors
      throw new AppError('412', 'Lead was not created in Sales System.')
    }

    const formattedCommunityList = [];
    if (communityList && communityList.length > 0) {
      // First, iterate through the communityList and format the followupDate to the ISOString.
      communityList.forEach((community) => {
        community.followupDate = convertToISODate(community.followupDate);
        formattedCommunityList.push(community);
      })
    }

    try {
      // Submit Add Communities/FUA request.
      if (formattedCommunityList && formattedCommunityList.length > 0) {
        await this.processCommunities(lead, formattedCommunityList, user);
      }
    }
    catch (err) {

    }

    try {
      // If we have an email, submit the request.
      if (lead && lead.influencer && lead.influencer.email) {
        const eloquaRequest = ObjectMappingService.createEloquaRequest(lead, formattedCommunityList, user);
        this.submitEloquaRequest(eloquaRequest);
      }
    }
    catch (err) {

    }
  }

  async handleExistingInquiryForm(lead, communities, user) {
    // IF zero/many community is selected always assume Contact Center community
    let leadId = lead.leadId;
    if (leadId == null) {
      // We should have a leadId here, if not throw new error.
      throw new AppError('412', 'Update attempted, but Lead record does not exist.')
    }

    if (lead.buildingId !== 225707) {
      try {
        let community = createCommunity();
        community.communityId = 225707;
        lead.leadId = null; // Need to null it out here!

        if (lead.influencer) {
          lead.influencer.influencerId = null; // Need to null it out here!
        }

        await this.processContactCenter(lead, community, user);
      }
      catch (err) {

      }
    }

    try {
      // Process any Prospect changes.
      // NOTE: Made a change to submitProspect to allow a null community.  For Prospect "Adds",
      //       it needs only communityId (buildingId)...for "Updates", it can be left off the request.
      await this.submitProspect(lead, null, user);
    }
    catch (err) {

    }

    // Determine if we need to fire Influencer changes.
    if (lead.influencer && lead.callingFor !== 'Myself') {
      try {
        // Set Gender ("What is the gender of the caller?") to influencer gender.
        lead.influencer.gender = lead.callerType;

        // Set "Reason for Call" to influencer interest reason.
        lead.influencer.interestReasonId = lead.reasonForCall;

        // Process any Influencer changes.
        const influencer = ObjectMappingService.createInfluencerRequest(leadId, lead.influencer, lead.callerType, user);
        await this.submitInfluencer(influencer);
      }
      catch (err) {

      }
    }

    try {
      // Process any Notes changes.
      const notes = lead.notes
      if (notes) {
        await this.submitNotes(leadId, notes, user);
      }
    }
    catch (err) {

    }

    try {
      // Process any Prospect Needs changes.
      const careType = lead.careType
      if (careType) {
        await this.submitProspectNeeds(leadId, lead, user);
      }
    }
    catch (err) {

    }

    try {
      // Process any Second Person changes...only if we are creating a new one!
      const secondPerson = lead.secondPerson;
      if (secondPerson && secondPerson.selected && !secondPerson.leadId) {
        const secondPersonRequest = ObjectMappingService.createSecondPersonRequest(leadId, lead.secondPerson, user);
        await this.submitSecondPerson(secondPersonRequest);
      }
    }
    catch (err) {
      
    }

    const communityList = [...communities];

    // try {
    //   // Process COI list.
    //   if (!containContactCenter(communities)) {
    //     let community = createCommunity();
    //     community.communityId = 225707
    //     communityList.push(community);
    //   }
    // }
    // catch (err) {

    // }

    const formattedCommunityList = [];
    if (communityList && communityList.length > 0) {
      // First, iterate through the communityList and format the followupDate to the ISOString.
      communityList.forEach((community) => {
        community.followupDate = convertToISODate(community.followupDate);
        formattedCommunityList.push(community);
      })
    }

    try {
      // Submit Add Communities/FUA request.
      if (formattedCommunityList && formattedCommunityList.length > 0) {
        await this.processCommunities(lead, formattedCommunityList, user);
      }
    }
    catch (err) {

    }

    try {
      // If we have an email, submit the request.
      if (lead && lead.influencer && lead.influencer.email) {
        const eloquaRequest = ObjectMappingService.createEloquaRequest(lead, formattedCommunityList, user);
        this.submitEloquaRequest(eloquaRequest);
      }
    }
    catch (err) {

    }
  }

  async submitToService({ lead, communities, user }) {
    await this.checkServerStatus();
    if (lead.leadId) {
      await this.handleExistingInquiryForm(lead, communities, user)
    }
    else {
      await this.handleNewInquiryForm(lead, communities, user)
    }
    return lead
  }

  createFetch(url) {
    return fetch(url, { mode: 'cors', cache: 'no-cache' })
      .then((res) => res.json())
  }

  log(msg) {
    if (process.env.NODE_ENV !== "production") {
      console.log(msg);
    }
  }
}

class Logger {

  isLoggingEnabled() {
    return (process.env.NODE_ENV !== "production");
  }

  debug(msg) {
    if (this.isLoggingEnabled()) {
      console.log(msg);
    }
  }

}

export {
  SalesAPIService,
}
