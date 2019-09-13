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

    for (let i = 0; i < communities.length; i++) {
      let community = communities[i];
      let prospect = createProspectRequest(lead, community);

      try {
        let resp = await fetch(leadUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(prospect)
        })
        const salesLead = resp.json();
        console.log(`SalesLead: ${JSON.stringify(salesLead)}`);
        const {objectId} = salesLead;
        console.log(`Sales Lead Id: ${objectId}`);
  
      } catch(err) {
        console.log(err);
      }

      let influencer = createInfluencerRequest(lead.influencer);
      if (influencer) {

      }
    }
  }

  actions.setSubmitting(false);
}

var SalesContact = function() {

}

var SalesLead = function(salesContact) {
  this.leadTypeId = 4;
  this.salesContact = salesContact;
}

export function createProspectRequest(lead, community, lastName = 'Unknown') {
  const {prospect} = lead;

  const salesContact = new SalesContact();
  const salesLead = new SalesLead(salesContact);

  salesContact.firstName = ((prospect && prospect.firstName) ? prospect.firstName : 'Unknown')
  salesContact.lastName = ((prospect && prospect.lastName) ? prospect.lastName : lastName);
  salesContact.emailAddress = prospect.email;
  salesContact.age = prospect.age;
  salesContact.birthDate = prospect.birthDate

  salesLead.buildingId = community.communityId;
  salesLead.inquiryLeadSourceId = lead.leadSource;
  salesLead.inquiryLeadSourceDetailId = lead.leadSourceDetail;
  salesLead.inquiryDate = new Date();

  return salesLead;

  // return {
  //   salesContact: {
  //     phoneNumbers: [
  //       {
  //         onNationalDoNotCall: false,
  //         primary: true,
  //         phoneNumber: "4143546213",
  //         phoneType: "Home",
  //       }
  //     ],
  //     firstName: ((prospect && prospect.firstName) ? prospect.firstName : 'Unknown'),
  //     lastName: ((prospect && prospect.lastName) ? prospect.lastName : lastName),
  //     emailAddress: prospect.email,
  //     gender: "M",
  //     age: 44,
  //     maritalStatus: "Single",
  //     veteranStatus: 2,
  //     currentSituation: 11,
  //     birthDate: "1975-03-08T05:00:00.000+0000"
  //   },
  //   buildingId: community.communityId,
  //   inquiryTypeId: 6,
  //   inquiryLeadSourceId: 4,
  //   inquiryLeadSourceDetailId: 58,
  //   leadTypeId: 4,
  //   inquirerType: "PROSP",
  //   inquiryDate: "2019-07-29T05:00:00.000+0000"
  // }
}

function createInfluencerRequest(influencer) {
  return {
    "salesContact": {
      "address": influencer.address,
      "phoneNumbers": [
        {
          "primary": true,
          "phoneType": "Home",
          "phoneNumber": influencer.number,
          "onNationalDoNotCall": false
        }
      ],
      "emailAddress": influencer.email,
      "firstName": influencer.firstName,
      "lastName": influencer.lastName,
    },
    "primary": false,
  };
}