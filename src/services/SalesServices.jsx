//import React from 'react'
import DedupRequest from './DedupRequest'

import { ProspectError, ObjectMappingService } from './Types'
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

  async getLeadById(guid) {
    const leadUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/guid/${guid}`;

    let salesLead = await this.createFetch(leadUrl);
    if (salesLead) {
      const lead = ObjectMappingService.createLead(salesLead);

      if (lead && lead.leadId) {
        // fetch influencer
        const { prospect } = lead;
        if (prospect) {
          const { contactId } = prospect;
          lead.currentSituation = prospect.currentSituation
          const inflUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/influencers/${contactId}`

          let influencers = await this.createFetch(inflUrl);
          let influencer = (influencers || []).find(function (influencer) {
            return (influencer.primary === true && influencer.active === true);
          });
          lead.influencer = ObjectMappingService.createContact(influencer);
        }
      }
      return lead;
    }
    // TODO: do we create an empty lead knowning that the system cannot find the lead? or alert the user?
    return ObjectMappingService.createEmptyLead();
  }

  async submitInfluencer(influencer) {
    const inflUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/influencer`;
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
    const fuaUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/fua`;

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
    const noteUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/note`;

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
    const prospectNeedsUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/prospectneed`;

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
    const secondPersonUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/secondperson`;

    if (this.log.isLoggingEnabled()) {
      this.log.debug(JSON.stringify(secondPersonRequest));
    }
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

  /**
  * Processes the submission of the contact center to the sales system based upon
  * input from the inquiry form.
  * 
  * @param {lead} lead the form lead object
  * @param {Community} community an object representing the contact center
  */
  async processContactCenter(lead, community) {
    const leadUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/prospect`;

    let prospect = ObjectMappingService.createProspectRequest(lead, community);

    let response = await fetch(leadUrl, {
      method: 'POST', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prospect)
    })
    const salesResponse = await response.json();
    if (response.status === 201) {
      // was successful
      const { objectId } = salesResponse;

      if (objectId) {
        lead.leadId = objectId
        console.log(`Sales Lead Id: ${objectId}`);

        if (prospect.inquirerType !== 'PROSP') {
          const influencer = ObjectMappingService.createInfluencerRequest(objectId, lead.influencer);
          this.submitInfluencer(influencer);
        }

        const notes = lead.notes
        if (notes) {
          this.submitNotes(objectId, notes);
        }

        const careType = lead.careType
        if (careType) {
          this.submitProspectNeeds(objectId, lead);
        }

        const secondPerson = lead.secondPerson;
        if (secondPerson) {
          const secondPersonRequest = ObjectMappingService.createSecondPersonRequest(objectId, lead.secondPerson);
          this.submitSecondPerson(secondPersonRequest);
        }

        return objectId;
      }
      else {
        throw new Error('Sales Lead was not created.')
      }
    }
  }

  async handleProspectSubmission(lead, community) {
    const leadUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/prospect`;

    let prospect = ObjectMappingService.createProspectRequest(lead, community);

    let response = await fetch(leadUrl, {
      method: 'POST', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prospect)
    })
    const salesResponse = await response.json();
    if (response.status === 201) {
      const { objectId } = salesResponse;
      lead.leadId = objectId
      return objectId;
    }
    throw new ProspectError(response.status, (response.statusText || 'Unable to communicate to server.'))
  }

  async retrieveProspect(leadId) {
    const prospectUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/${leadId}/prospect`

    // already returning json from this fetch
    const prospect = await this.createFetch(prospectUrl)
    return prospect;
  }

  async handleNewInquiryForm(lead, communities, actions) {

    const communityList = [...communities];

    // IF zero/many community is selected always assume Contact Center community
    let leadId = null;
    if (!CommunityService.containContactCenter(communities)) {
      let community = CommunityService.createCommunity();
      community.communityId = 225707
      leadId = await this.processContactCenter(lead, community);
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
        leadId = await this.processContactCenter(lead, contactCenter);
      }
    }

    if (leadId == null) {
      leadId = lead.leadId;
    }

    if (leadId != null) {
      let prospect = await this.retrieveProspect(leadId);
      for (let i = 0; i < communityList.length; i++) {
        let community = communityList[i];
        this.handleProspectSubmission(community, prospect);

        this.submitFollowup(leadId, community);

      }
    }
  }

  handleExistingInquiryForm(lead, communities, actions) {

  }

  async submitToService({ lead, communities, actions }) {
    let successful = true;
    try {
      if (lead.leadId) {
        console.log(`LeadId: ${lead.leadId}`);
        this.handleExistingInquiryForm(lead, communities, actions)
      }
      else {
        this.handleNewInquiryForm(lead, communities, actions)
      }
    } catch (err) {
      console.log(err);
      successful = false;
    }
    actions.setSubmitting(false);
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
