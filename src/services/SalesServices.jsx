//import React from 'react'
import DedupRequest from './DedupRequest'

import { ProspectError, ObjectMappingService, Util, SalesContact } from './Types'
import { CommunityService } from './CommunityServices'

class DuplicationService {

  static shouldRunDuplicateCheck(contact) {
    if (contact) {
      const { firstName, lastName, email, phone: { number, type } } = contact;
      if (!firstName && !lastName) {
        return false;
      }
      if ((!number || !type) && !email) {
        return false;
      }
      return true;
    }
    return false;
  }

  /*
  since this export is not default... on the import you need to do ... import { duplicateCheck } from '../services/duplicateCheck' this is because we don't have a default export
  just a normal export
  */
  checkForDuplicate(contact, address) {
    // const endpoint = window.encodeURI(`${process.env.REACT_APP_SALES_SERVICES_URL}/ContactService/api/duplicate/check`);

    // const dupRequest = new DedupRequest(contact, address);

    // return fetch(endpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   mode: 'cors',
    //   cache: 'no-cache',
    //   body: JSON.stringify(dupRequest.payload)
    // })
    //   .then((resp) => resp.json())
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

  async submitInfluencer(influencer) {
    const inflUrl = this.createApiUri('influencer');
    if (influencer) {
      try {
        let response = await fetch(inflUrl, {
          method: 'POST', mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(influencer),
        })
        const inf = await response.json();
        if (response.status !== 201) {
          console.log(`Error: ${response.status} ${inf.message}`);
        }
      }
      catch (err) {
        console.log(err);
        // successful = false;
      }
    }
  }

  async submitFollowup(leadId, community) {
    const fuaUrl = this.createApiUri('leads/fua')

    let followup = ObjectMappingService.createFollowupRequest(leadId, community)
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
        }
      }
      catch (err) {
        console.log(err);
        //successful = false;
      }
    }
  }

  /**
  * Submits notes to the server.
  * @param {number} coid the lead id used to associate the note
  * @param {note} notes the note object which contains all form notes
  */
  async submitNotes(coid, notes) {
    const noteUrl = this.createApiUri('leads/note');

    for (let [key, value] of Object.entries(notes)) {
      console.log(`Note: ${key}`);
      if (value && value.trim().length > 0) {
        let noteRequest = ObjectMappingService.createNoteRequest(coid, value);
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

  async submitProspectNeeds(coid, lead) {
    const prospectNeedsUrl = this.createApiUri('leads/prospectneed')

    let prospectNeedsRequest = ObjectMappingService.createProspectNeedsRequest(coid, lead);
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

  async submitSecondPerson(secondPersonRequest) {
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

  async sendAddCoiRequest(request) {
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
    else {
      throw new Error('Sales Lead was not created.')
    }
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
    else {
      throw new Error('Sales Lead was not created.')
    }
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
      const influencer = ObjectMappingService.createInfluencerRequest(leadId, lead.influencer);
      this.submitInfluencer(influencer);
    }

    const notes = lead.notes
    if (notes) {
      this.submitNotes(leadId, notes);
    }

    const careType = lead.careType
    if (careType) {
      this.submitProspectNeeds(leadId, lead);
    }

    const secondPerson = lead.secondPerson;
    if (secondPerson && !Util.isContactEmpty(secondPerson)) {
      const secondPersonRequest = ObjectMappingService.createSecondPersonRequest(leadId, lead.secondPerson);
      this.submitSecondPerson(secondPersonRequest);
    }

    return leadId;
  }

  /**
   * Create a new lead for the community of interest, tying it to the prospect
   * that was already created
   * 
   * @param {lead} the lead information from the form
   * @param {SalesContact} prospect the sales contact from SMS
   * @param {Community} community the community to which the lead pertains
   */
async handleAddCommunitySubmission(lead, community, user) {
  let salesLead = ObjectMappingService.createAddCoiRequest(lead, community, user);
  return await this.sendAddCoiRequest(salesLead);
//  throw new ProspectError(response.status, (response.statusText || 'Unable to communicate to server.'))
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

  if (leadId == null) {
    leadId = lead.leadId;
  }

  const eloquaCommunityList = [];
  if (leadId != null) {
    for (let i = 0; i < communityList.length; i++) {
      let community = communityList[i];
      
      let nleadId = await this.handleAddCommunitySubmission(lead, community, user);
      this.submitFollowup(nleadId, community);

      // Check to see if this community has an applicable Follow Up Action that
      // would deem submission of an External Eloqua Email.  If so, add it to the
      // eloquaCommunityList.
      // 5	Visit/Appt - Scheduled
      // 6	Home Visit
      // 8	Assessment
      const actionArray = ["5", "6", "8"];
      if (actionArray.indexOf(community.followUpAction) > -1) {
        // Convert the followupDate accordingly!
        community.followupDate = CommunityService.convertToISODate(community.followupDate);
        eloquaCommunityList.push(community);
      }
    }

    // If we have communities in eloquaCommunityList, submit the request.
    if (eloquaCommunityList && eloquaCommunityList.length > 0) {
      const eloquaExternalRequest = ObjectMappingService.createEloquaExternalRequest(lead, eloquaCommunityList, user.name);
      console.log(eloquaExternalRequest);
      this.submitEloquaRequest(eloquaExternalRequest);
    }
  }
}

handleExistingInquiryForm(lead, communities, user) {

}

async submitToService({ lead, communities, user }) {
  let successful = true;

  try {
    if (lead.leadId) {
      console.log(`LeadId: ${lead.leadId}`);
      this.handleExistingInquiryForm(lead, communities, user)
    }
    else {
      this.handleNewInquiryForm(lead, communities, user)
    }
  } catch (err) {
    console.log(err);
    successful = false;
  }
  return successful;
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
