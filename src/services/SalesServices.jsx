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
      // .then((data) => console.log(data))
      // .catch((error) => console.error('Error:', error));
}

export function retrieveCallPrompts() {
    return [
      {value: 1, label: "Age and Need for Care"},
      {value: 2, label: "Death of Spouse"},
      {value: 3, label: "Downsizing"},
      {value: 4, label: "Memory Concerns"},
      {value: 5, label: "No Longer able to Care for Loved One at Home"},
      {value: 6, label: "Recent Hospital Visit - Doctor Recommendation"},
      {value: 7, label: "Response to Marketing Material"},
      {value: 8, label: "Relocation"}
    ];
}

export function getAddressStates() {
  const endpoint = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/stateProv`;

  return fetch(endpoint, { mode: 'cors', cache: 'no-cache' })
    .then((res) => res.json());
}

export function getLeadSources() {
  const url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/inquiryLeadSource`;
  return fetch(url, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json());
}

export function getLeadSourceDetails(leadSourceId) {
  var url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/inquiryLeadSource/${leadSourceId}/inquiryLeadSourceDetails`;
  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json())
}

export function getPhoneTypes() {
  const url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/phoneTypes`;

  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json());
}

export function getInquiryTypes() {
  const url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/inquiryTypes`;
  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json())
}

export function getVeteranStatus() {
  const url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/veteranStatus`;
  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json())
}

export function getDecisionTimeframe() {
  const url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/decisionTimeframe`;

  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json());
}

export function getReasonForInterest() {
  const url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/interestReason`

  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json())
}

export function getCurrentSituation() {
  const url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/currentSituation`;
  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json());
}

export function getCareTypes() {
  const url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/dropdowns/careTypes`

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
      leadSource: {
        leadSourceId: 4,
        leadSourceDetailId: 58,
      },
      notes: {

      }
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

export function createProspectRequest(lead, community, lastName = 'Unknown') {
  const {prospect} = lead;

  return {
    salesContact: {
      phoneNumbers: [
        {
          onNationalDoNotCall: false,
          primary: true,
          phoneNumber: "4143546213",
          phoneType: "Home",
        }
      ],
      firstName: ((prospect && prospect.firstName) ? prospect.firstName : 'Unknown'),
      lastName: ((prospect && prospect.lastName) ? prospect.lastName : lastName),
      emailAddress: prospect.email,
      gender: "M",
      age: 44,
      maritalStatus: "Single",
      veteranStatus: 2,
      currentSituation: 11,
      birthDate: "1975-03-08T05:00:00.000+0000"
    },
    buildingId: 225707,
    inquiryTypeId: 6,
    inquiryLeadSourceId: 4,
    inquiryLeadSourceDetailId: 58,
    leadTypeId: 4,
    inquirerType: "PROSP",
    inquiryDate: "2019-07-29T05:00:00.000+0000"
  }
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