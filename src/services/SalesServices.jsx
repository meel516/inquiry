//import React from 'react'
//import axios from 'axios'
import DedupRequest from './DedupRequest'

/*
since this export is not default... on the import you need to do ... import { duplicateCheck } from '../services/duplicateCheck' this is because we don't have a default export
just a normal export
*/
export function checkForDuplicate(contact, address) {
    const endpoint = window.encodeURI(`${process.env.REACT_APP_SALES_SERVICES_URL}/ContactService/api/duplicate/check`);

    const dupRequest = new DedupRequest(contact, address);

    return fetch(endpoint, { method:'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(dupRequest.payload)})
      .then((resp) => resp.json())
}

export function getAddressStates() {
  return createFetch(createDropDownUrl('stateProv'))
}

export function getLeadSources() {
  return createFetch(createDropDownUrl('inquiryLeadSource'))
}

export function getLeadSourceDetails(leadSourceId) {
  return createFetch(`${createDropDownUrl('inquiryLeadSource')}/${leadSourceId}/inquiryLeadSourceDetails`);
}

export function getPhoneTypes() {
  return createFetch(createDropDownUrl('phoneTypes'))
}

export function getInquiryTypes() {
  return createFetch(createDropDownUrl('inquiryTypes'))
}

export function getVeteranStatus() {
  return createFetch(createDropDownUrl('veteranStatus'))
}

export function getDecisionTimeframe() {
  return createFetch(createDropDownUrl('decisionTimeframe'))
}

export function getReasonForInterest() {
  return createFetch(createDropDownUrl('interestReason'))
}

export function getCurrentSituation() {
  return createFetch(createDropDownUrl('currentSituation'))
}

export function getCareTypes() {
  return createFetch(createDropDownUrl('careTypes'))
}

export function getFollowupActions() {
  return createFetch(createDropDownUrl('followUpActions'))
}

function createDropDownUrl(action) {
  return `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/${action}`
}

function createFetch(url) {
  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json())
}

export function createEmptyLead() {
  return  {
      influencer: {
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phone: {
          number: "",
          type: ""
        },
        address: {
          addressLine1: "",
          addressLine2: "",
        },
      },
      secondPerson: {
        firstName: "",
        lastName: "",
        phone: {
          number: "",
          type: ""
        },
      },
      prospect: {
        firstName: "",
        lastName: "",
        email: "",
        phone: {
          number: "",
          type: ""
        }
      },
      leadSource: "",
      leadSourceDetail: "",
      notes: {

      },
      nextSteps: "",
    };
}

export function createLeadById(guid) {
  var url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/guid/${guid}`;
  //const lead = createEmptyLead();

  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json());
}

export async function submitToService({lead, communities, actions}) {
  console.log('submitting lead form to service');

  console.log(`Communities: ${JSON.stringify(communities)}`);
  console.log('Lead: ' + JSON.stringify(lead));

  if (lead.leadId) {
    console.log(`LeadId: ${lead.leadId}`);
  }
  else {
    var leadUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/prospect`;
    var url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/influencer`;

    const influencer = {
      "salesContact": {
        "address": lead.influencer.address,
        "phoneNumbers": [
          {
            "primary": true,
            "phoneType": "Home",
            "phoneNumber": lead.influencer.number,
            "onNationalDoNotCall": false
          }
        ],
        "emailAddress": lead.influencer.email,
        "firstName": lead.influencer.firstName,
        "lastName": lead.influencer.lastName,
      },
      "primary": false,
    };

    const prospect = {
      "salesContact": {
        "phoneNumbers": [
          {
            "onNationalDoNotCall": false,
            "primary": true,
            "phoneNumber": "4143546213",
            "phoneType": "Home"
          }
        ],
        "firstName": lead.prospect.firstName,
        "lastName": lead.prospect.lastName,
        "emailAddress": lead.prospect.email,
        "veteranStatus": 2,
        "currentSituation": 11,
        "birthDate": "1975-03-08T05:00:00.000+0000"
      },
      "leadStatus": {
        "dayRespite": false,
        "status": 1,
        "effectiveDate": "2019-07-29T16:42:18.000+0000"
      },
      "buildingId": 140,
      "inquiryTypeId": 6,
      "inquiryLeadSourceId": 4,
      "inquiryLeadSourceDetailId": 58,
      "leadTypeId": 4,
      "decisionTimeframeId": 1,
      "inquirerType": "PROSP",
    }

    try {
      let reponse = await fetch(leadUrl, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prospect)
      })
      const salesLead = reponse.json();
      console.log(JSON.stringify(salesLead));

    } catch(err) {
      console.log(err);
    }

  }

  actions.setSubmitting(false);
}
