import React from 'react'
import axios from 'axios'

/*
since this export is not default... on the import you need to do ... import { duplicateCheck } from '../services/duplicateCheck' this is because we don't have a default export
just a normal export
*/
const SALES_SERVICES_URL = 'https://sales-services.uat.assisted.com';
const SALES_SYSTEM_URL = 'https://sales.uat.assisted.com'

export function checkForDuplicate(contact, address) {
    const endpoint = window.encodeURI(`${SALES_SERVICES_URL}/ContactService/api/v1/contacts/validations/duplicateCheck`);

    const payload = {
      "address1":{
        "line1":"",
        "line2":"",
        "city":"",
        "state":"",
        "zip":""
      },
      "emailAddress":"Kris.Bryant@gmail.com",
      "firstName":"Kris",
      "lastName":"Bryant",
      "phones":[
        {
        "extension":"",
        "intlPhoneNbr":"",
        "phoneNbr":"4149185000",
        "phoneType":"WORK"
      }
      ]
    }

    return fetch(endpoint, { method:'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(payload)});
      // .then((resp) => resp.json())
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
  const endpoint = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/stateProv`;

  return fetch(endpoint, { mode: 'cors', cache: 'no-cache' })
    .then((res) => res.json());
}

export function getLeadSources() {
  const url = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/inquiryLeadSource`;
  return fetch(url, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json());
}

export function getLeadSourceDetails(leadSourceId) {
  var url = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/inquiryLeadSource/${leadSourceId}/inquiryLeadSourceDetails`;
  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json())
}

export function getPhoneTypes() {
  
}

export function getDecisionTimeframe() {
  var url = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/decisionTimeframe`;

  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json())
}

export function createEmptyLead() {
  return  {
      influencer: {
        firstName: "",
        lastName: "",
        gender: "",
        phone: {
          number: "",
          type: ""
        },
        address: {
          addressLine1: "",
        },
      },
      secondPerson: {
        firstName: "",
        lastName: "",
      },
      prospect: {
        firstName: "",
        lastName: "",
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

export function createLeadById(leadId) {
  const lead = createEmptyLead();

  return lead;
}

export function submitToService({lead, communities}) {
  console.log('submitting lead form to service');

  console.log('Communities: ' + JSON.stringify(communities));
  console.log('Lead: ' + JSON.stringify(lead));

}
