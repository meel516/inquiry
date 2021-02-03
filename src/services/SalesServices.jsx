//import React from 'react'
import { isContactCenter, createCommunity, containContactCenter } from './community-services'
import convertToDateTimeStr from '../utils/convert-to-dateTimeStr'
import { ObjectMappingService } from './Types'
import ServerError from '../models/server-error'
import AppError from '../models/app-error'
import { get } from 'lodash'
import createEloquaCdo from './eloqua/create-cdo'

import createProspectNeedsRequest from '../mappers/create-prospect-needs-request'
import handleResultOfCall from '../services/handle-result-of-call'

// business logic ------
class SalesAPIService {

  constructor() {
    this.log = new Logger();
  }

  createApiUri(api) {
    return window.encodeURI(`${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/${api}`)
  }

  async getLeadById({ guid, leadId }) {
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

  async getLeadByLeadId(leadId, influencerContactIdToLoad) {
    const leadUrl = this.createApiUri(`leads/${leadId}`)
    return await this.getLeadByUrl(leadUrl, influencerContactIdToLoad);
  }

  async retrieveLeadDataForContactId(contactId) {
    const endpoint = this.createApiUri(`lead/contact/${contactId}`);
    const output = await this.createFetch(endpoint);
    return ObjectMappingService.buildLeadDataResponseForContactId(output);
  }

  async getLeadByUrl(uri, influencerContactIdToLoad) {
    let influencer = "";

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
          catch (e) {
            influencers = null
          }

          // Initialize property.
          lead.hasInfluencers = 0;

          // Determine if we load the page with or without influencers.
          if (influencers && influencers.length > 0) {
            // Set a property (on load) to save the fact we have influencers.
            lead.hasInfluencers = 1;

            influencer = influencers.find(function (influencer) {
              if (influencerContactIdToLoad && influencerContactIdToLoad !== '') {
                return (influencer.salesContact.contactId === influencerContactIdToLoad);
              } else {
                return (influencer.primary === true && influencer.active === true);
              }
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

            // Populate Gender
            let tmpGender = get(lead, 'prospect.gender');
            if (tmpGender) {
              lead.callerType = tmpGender;
            } else {
              lead.callerType = '';
            }

            // Since specific values to be used later.
            let tmpAge = get(lead, 'prospect.age');
            let tmpVetStat = get(lead, 'prospect.veteranStatus');

            lead.prospect = ObjectMappingService.createEmptyContact();

            // Now populate...
            if (tmpAge) {
              lead.prospect.age = tmpAge;
            }
            if (tmpVetStat) {
              lead.prospect.veteranStatus = tmpVetStat;
            }
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

        // Populate Text Opt In Checkbox
        if (salesLead.inquirerType === 'PROSP') {
          // Populate checkbox from Prospect
          lead.textOptInCheckbox = !!prospect.textOptInCheckbox;
        } else {
          // Populate checkbox from Influencer
          lead.textOptInCheckbox = !!influencer.salesContact.textOptInInd;
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
      await fetch(secondPersonUrl, {
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
  async processContactCenter(lead, community, user, isAdd) {
    const salesLead = await this.submitProspect(lead, community, user)
    let leadId = lead.leadId = salesLead.leadId

    if (salesLead.inquirerType !== 'PROSP' || (salesLead.inquirerType === 'PROSP' && lead.hasInfluencers === 1)) {
      if (salesLead.inquirerType !== 'PROSP' && lead.reasonForCall) {
        // Set "Reason for Call" to influencer interest reason.
        lead.influencer.interestReasonId = lead.reasonForCall;
      }

      // Since this method is only fired when we need to create a new CC lead...we need to null out
      // influencerId in order to create a new one.  Do this when we have an existing influencer and
      // it's an add scenario!!!
      if (isAdd && lead.hasInfluencers === 1) {
        lead.influencer.influencerId = null;
      }

      const influencer = ObjectMappingService.createInfluencerRequest(leadId, lead.influencer, lead.callerType, user);
      // Process addSubscriber logic.
      influencer.salesContact.addSubscriber = lead.addSubscriber;

      if (salesLead.inquirerType === 'INFLU') {
        influencer.salesContact.textOptInInd = !!lead.textOptInCheckbox
      } else {
        influencer.salesContact.textOptInInd = false
      }

      const influencerId = await this.submitInfluencer(influencer);
      lead.influencer.influencerId = influencerId
      lead.influencer.textOptInCheckbox = influencer.salesContact.textOptInInd;
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

    await handleResultOfCall(lead, user);

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

  async prospectOnlyHasContactCenterCOI(prospectContactId) {
    if (prospectContactId) {
      const leadCOIs = await this.retrieveLeadDataForContactId(prospectContactId);
      // Check if the list is only ONE and if it's from the Contact Center.
      if (leadCOIs && leadCOIs.length === 1) {
        if (leadCOIs[0].buildingid === 225707) {
          return true;
        }
      }
    }

    return false;
  }

  async handleNewInquiryForm(lead, communities, user) {
    const communityList = [...communities];

    let processAddSubscriber = true;
    const txtContactVisitList = ["5", "6", "8", "59"];
    const formattedCommunityList = [];
    if (communityList && communityList.length > 0) {
      // First, iterate through the communityList and format the followupDate to the ISOString.
      communityList.forEach((community) => {
        community.followupDate = convertToDateTimeStr(community.followupDate);
        formattedCommunityList.push(community);

        // Check if the action is one of the Text Contact Visit values.
        if (txtContactVisitList.indexOf(community.followUpAction) > -1) {
          processAddSubscriber = false;
        }
      })
    }

    lead.addSubscriber = processAddSubscriber;

    // IF zero/many community is selected always assume Contact Center community
    let leadId = null;
    try {
      if (!containContactCenter(communities)) {
        let community = createCommunity();
        community.communityId = 225707
        leadId = await this.processContactCenter(lead, community, user, true);
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
          leadId = await this.processContactCenter(lead, contactCenter, user, false);
        }
      }
    }
    catch (err) {

    }

    if (leadId == null) {
      // throw new error due to lead was not created due to errors
      throw new AppError('412', 'Lead was not created in Sales System.')
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
      // Submit every request to Eloqua.
      if (lead && lead.influencer) {
        await createEloquaCdo(lead, formattedCommunityList, user.username, user.email)
      }
    }
    catch (err) {

    }
  }

  async handleExistingInquiryForm(lead, communities, user) {
    // IF zero/many community is selected always assume Contact Center community
    if (lead.leadId == null) {
      // We should have a leadId here, if not throw new error.
      throw new AppError('412', 'Update attempted, but Lead record does not exist.')
    }

    // Handle swap logic, if it exists.
    if (lead && lead.swapProspect) {
      lead.hasInfluencers = 0;

      // if (lead && lead.influencer && lead.influencer.influencerId !== "") {
      //   lead.influencer.influencerId = "";
      // }

      // Save off Veteran Status since the below line overwrites it!!!
      let formVetStatus = lead.prospect.veteranStatus;
      lead.prospect = ObjectMappingService.createEmptyContact();
      lead.prospect.veteranStatus = formVetStatus;
    }

    let leadId = null;
    const communityList = [...communities];

    // if not the contact center clear the leadId
    lead.leadCareTypeId = null;
    if (!isContactCenter({ buildingId: lead.buildingId })) {
      lead.leadId = null;
    }

    let contactCenter = null;
    let isAdd = true;
    try {
      if (!containContactCenter(communityList) && lead.buildingId !== 225707) { // Don't fire this if we already have a CC lead!
        contactCenter = createCommunity();
        contactCenter.communityId = 225707;
      }
      else {
        isAdd = false;
        communityList.map((community) => {
          if (isContactCenter(community)) {
            contactCenter = community;
            return null;
          }
          return community;
        });
      }

      leadId = await this.processContactCenter(lead, contactCenter, user, isAdd);
    }
    catch (e) {
      // todo: add logic here to handle errors
    }

    if (lead.leadId == null) {
      lead.leadId = leadId;
    }

    let processAddSubscriber = true;
    const txtContactVisitList = ["5", "6", "8", "59"];
    const formattedCommunityList = [];
    if (communityList && communityList.length > 0) {
      // First, iterate through the communityList and format the followupDate to the ISOString.
      communityList.forEach((community) => {
        community.followupDate = convertToDateTimeStr(community.followupDate);
        formattedCommunityList.push(community);

        // Check if the action is one of the Text Contact Visit values.
        if (txtContactVisitList.indexOf(community.followUpAction) > -1) {
          processAddSubscriber = false;
        }
      })
    }

    lead.addSubscriber = processAddSubscriber;

    try {
      // Submit Add Communities/FUA request.
      if (formattedCommunityList && formattedCommunityList.length > 0) {
        await this.processCommunities(lead, formattedCommunityList, user);
      }
    }
    catch (err) {
      // todo: handle errors here
    }

    try {
      // Submit every request to Eloqua.
      if (lead && lead.influencer) {
        await createEloquaCdo(lead, formattedCommunityList, user.username, user.email)
      }
    }
    catch (err) {
      // todo: handle errors here
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

  processReturnResults(res) {
    if (res && res.ok) {
      return res.json();
    } else {
      return null;
    }
  }

  createFetch(url) {
    return fetch(url, { mode: 'cors', cache: 'no-cache' })
      .then((res) => this.processReturnResults(res))
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
