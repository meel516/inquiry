//import React from 'react'
import DedupRequest from './DedupRequest'

import { ProspectError, ServerError, ObjectMappingService } from './Types'
import { CommunityService } from './CommunityServices'
import { AppError } from './Types';

class DuplicationService {

  shouldRunDuplicateCheck(contact) {
    if (contact) {
      const { email, phone: { number, type } } = contact;
      if ((!number || !type) && !email) {
        return false;
      }
      return true;
    }
    return true;
  }

  async checkForDuplicate(contact) {
    const endpoint = window.encodeURI(`${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/contact/duplication`);
    
    const contactDupeRequest = ObjectMappingService.createContactDuplicationRequest(contact);
    console.log(JSON.stringify(contactDupeRequest));

    let response = await fetch(endpoint, {
      method: 'POST', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactDupeRequest),
    })
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      return ObjectMappingService.createContactDuplicateGridContent(data);
    } else {
      throw new Error('Error Performing Duplicate Search')
    }
  }
}

class DropDownService {

  static getAddressStates() {
    return this.createFetch(this.createDropDownUrl('stateProv'))
  }

  static getLeadSources() {
    return this.createFetch(this.createDropDownUrl('inquiryLeadSource'))
  }

  static getLeadSourceDetails(leadSourceId) {
    return this.createFetch(`${this.createDropDownUrl('inquiryLeadSource')}/${leadSourceId}/inquiryLeadSourceDetails`);
  }

  static getPhoneTypes() {
    return this.createFetch(this.createDropDownUrl('phoneTypes'))
  }

  static getInquiryTypes() {
    return this.createFetch(this.createDropDownUrl('inquiryTypes'))
  }

  static getVeteranStatus() {
    return this.createFetch(this.createDropDownUrl('veteranStatus'))
  }

  static getDecisionTimeframe() {
    return this.createFetch(this.createDropDownUrl('decisionTimeframe'))
  }

  static getReasonForInterest() {
    return this.createFetch(this.createDropDownUrl('interestReason'))
  }

  static getCurrentSituation() {
    return this.createFetch(this.createDropDownUrl('currentSituation'))
  }

  static getCareTypes() {
    return this.createFetch(this.createDropDownUrl('careTypes'))
  }

  static getFollowupActions() {
    return this.createFetch(this.createDropDownUrl('followUpActions'))
  }

  static createDropDownUrl(action) {
    return `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/${action}`
  }

  static createFetch(url) {
    return fetch(url, { mode: 'cors', cache: 'no-cache' })
      .then((res) => res.json())
  }
}

// business logic ------
class SalesAPIService {

  constructor() {
    this.log = new Logger();
  }

  createApiUri(api) {
    return window.encodeURI(`${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/${api}`)
  }

  async getLeadByGuid(guid) {
    const leadUrl = this.createApiUri(`leads/guid/${guid}`);
    return await this.getLeadByUrl(leadUrl);
  }

  // TODO: need to build this out, so that system can fetch lead by Id not just guid
  async getLeadById(leadId) {
    const leadUrl = this.createApiUri(`leads/${leadId}`)
    return await this.getLeadByUrl(leadUrl);
  }

  async retrieveLeadDataForContactId (contactId) {
    debugger;
    const endpoint = window.encodeURI(`${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/lead/contact/${contactId}`);
    const output = await this.createFetch(endpoint);
    
    console.log(JSON.stringify(output));
    return ObjectMappingService.buildLeadDataResponseForContactId(output);
  }

  async getLeadByUrl(uri) {
    let salesLead = await this.createFetch(uri);
    if (salesLead) {
      const lead = ObjectMappingService.createLead(salesLead);

      if (lead && lead.leadId) {
        // fetch influencer
        const { prospect } = lead;
        if (prospect) {
          const { contactId } = prospect;
          lead.currentSituation = prospect.currentSituation
          const inflUrl = this.createApiUri(`influencers/${contactId}`)

          let influencers = await this.createFetch(inflUrl);
          let influencer = (influencers || []).find(function (influencer) {
            return (influencer.primary === true && influencer.active === true);
          });
          lead.influencer = ObjectMappingService.createInfluencer(influencer);
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
   * Creates a new followup request and pushs the request to the service api.
   * There will never be updates to followups only new ones created.
   * 
   * @param {number} leadId the lead key to which the follow up pertains
   * @param {object} community the community to which the follow up pertains
   * @param {object} user the user logged in
   */
  async submitFollowup(leadId, community, user) {
    const fuaUrl = this.createApiUri('leads/fua')

    let followup = ObjectMappingService.createFollowupRequest(leadId, community, user)
    if (followup) {
      try {
        let response = await fetch(fuaUrl, {
          method: 'POST', mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(followup),
        })
        const fua = await response.json();
        if (response.status !== 201) {
          console.log(`Error: ${response.status} ${fua.message}`);
          throw new ServerError(response.status, fua.message, 'followup')
        }
      }
      catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
        throw new ServerError('', 'Could not connect to follow up service.');
      }
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

    let prospectNeedsRequest = ObjectMappingService.createProspectNeedsRequest(coid, lead, user);
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

  async submitEloquaRequest(eloquaExternalRequest) {
    const eloquaExternalUrl = this.createApiUri('inquiryForm/eloqua/external')

    fetch(eloquaExternalUrl, {
      method: 'POST', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eloquaExternalRequest),
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  async submitProspect(lead, community, user) {
    const prospect = ObjectMappingService.createProspectRequest(lead, community, user);
    return await this.sendProspect(prospect);
  }

  async sendAddCommunityRequest(request) {
    const coidUrl = this.createApiUri('addCommunity')
    let response = await fetch(coidUrl, {
      method: 'POST', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })
    const salesResponse = await response.json();
    if (response.status === 201) {
      const { objectId } = salesResponse;
      return objectId;
    }
    throw new ServerError({status: response.status, message: response.message, entity: 'community'});
  }

  async sendProspect(prospectRequest) {
    const leadUrl = this.createApiUri('prospect')
    let response = await fetch(leadUrl, {
      method: 'POST', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prospectRequest)
    })

    const salesResponse = await response.json();
    if (response.status === 201) {
      const { objectId } = salesResponse;
      prospectRequest.leadId = objectId

      return prospectRequest;
    }
    throw new ServerError({status: response.status, message: response.message, entity: 'prospect'});
  }

  /**
  * Processes the submission of the contact center to the sales system based upon
  * input from the inquiry form.
  * 
  * @param {lead} lead the form lead object
  * @param {Community} community an object representing the contact center
  */
  async processContactCenter(lead, community, user) {
    const salesLead = await this.submitProspect(lead, community, user)
    let leadId = lead.leadId = salesLead.leadId

    if (salesLead.inquirerType !== 'PROSP') {
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
    if (!CommunityService.containContactCenter(communities)) {
      let community = CommunityService.createCommunity();
      community.communityId = 225707
      leadId = await this.processContactCenter(lead, community, user);
    }
    else {
      let contactCenter;
      communityList.map((community) => {
        if (CommunityService.isContactCenter(community)) {
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
  catch(err) {

  }

  if (leadId == null) {
    // throw new error due to lead was not created due to errors
    throw new AppError('412', 'Lead was not created in Sales System.')
  }

  const formattedCommunityList = [];
  const eloquaCommunityList = [];
  if (communityList && communityList.length > 0) {
    // First, iterate through the communityList and format the followupDate to the ISOString.
    communityList.forEach((community) => {

      community.followupDate = CommunityService.convertToISODate(community.followupDate);
      formattedCommunityList.push(community);

      // Check to see if this community has an applicable Follow Up Action that
      // would deem submission of an External Eloqua Email.  If so, add it to the
      // eloquaCommunityList.
      // 5	Visit/Appt - Scheduled
      // 6	Home Visit
      // 8	Assessment
      const actionArray = ["5", "6", "8"];
      if (actionArray.indexOf(community.followUpAction) > -1) {
        eloquaCommunityList.push(community);
      }

    })
  }

  try {
      // Submit Add Communities/FUA request.
      if (formattedCommunityList && formattedCommunityList.length > 0) {
        await this.processCommunities(lead, formattedCommunityList, user);
      }
  }
  catch(err) {

  }

  try {
    // If we have an email and communities in eloquaCommunityList, submit the request.
    if (lead && lead.influencer && lead.influencer.email &&
      eloquaCommunityList && eloquaCommunityList.length > 0) {
      const eloquaExternalRequest = ObjectMappingService.createEloquaExternalRequest(lead, eloquaCommunityList, user.name);
      this.submitEloquaRequest(eloquaExternalRequest);
    }
  }
  catch(err) {

  }
}

handleExistingInquiryForm(lead, communities, user) {

}

async submitToService({ lead, communities, user }) {

  try {
    if (lead.leadId) {
      this.handleExistingInquiryForm(lead, communities, user)
    }
    else {
      this.handleNewInquiryForm(lead, communities, user)
    }
    return lead

  } catch (err) {
    console.log(err);
  }
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
  DropDownService,
  DuplicationService,
  SalesAPIService,
}
