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

function createEmptyContact() {
  return {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: {
      number: "",
      type: ""
    }
  }
}

function createEmptyAddress() {
  return {
    addressLine1: "",
    addressLine2: "",
  }
}

function createEmptyNotes() {
  return {

  }
}

function Lead() {}

export function createEmptyLead() {
  const lead = new Lead();
  lead.influencer = createEmptyContact();
  lead.influencer.address = createEmptyAddress();
  lead.secondPerson = createEmptyContact();
  lead.prospect = createEmptyContact();
  lead.notes = createEmptyNotes();
  return lead;
}

export function createLeadById(guid) {
  var url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/guid/${guid}`;
  //const lead = createEmptyLead();

  return fetch(url, {mode: 'cors', cache: 'no-cache'})
    .then((res) => res.json());
}

export async function submitToService({lead, communities, actions}) {
  let successful = true;
  console.log('submitting lead form to service');
  debugger;

  if (lead.leadId) {
    console.log(`LeadId: ${lead.leadId}`);
  }
  else {
    var leadUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/prospect`;
    var url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/influencer`;

    // IF no community is selected then assume 64000 community

    for (let i = 0; i < communities.length; i++) {
      let community = communities[i];
      let prospect = createProspectRequest(lead, community);
      console.log(`Submit Request: ${prospect}`);

      try {
        let response = await fetch(leadUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(prospect)
        })
        const salesResponse = await response.json();
        if (response.status === 201) {
          // was successful
          console.log('successfully created sales lead')
          const {objectId} = salesResponse;
          console.log(`Sales Lead Id: ${objectId}`);

          let influencer = createInfluencerRequest(lead.influencer);
          if (influencer) {
    
          }

        } else {
          // failed
          console.log('failed to create sales lead')
          actions.setStatus(salesResponse.error.substring(0, 200));
          successful = false;
        }
  
      } catch(err) {
        console.log(err);
        successful = false;
      }
    }
  }

  actions.setSubmitting(false);
  return successful;
}

var SalesContact = function() {

}

var SalesLead = function(salesContact) {
  this.leadTypeId = 4;
  this.salesContact = salesContact;
}

function mapInquiryTypeValue(callingFor) {
  if (callingFor && callingFor === 'Myself') {
    return 'PROSP'
  }
  else {
    return 'INFLU'
  }
}

function toSaleDateFormat(d) {
  if (d instanceof Date) {
    debugger
    let str = d.toISOString().replace('T', "'T'");
    return str
  }
  return null;
}

export function createProspectRequest(lead, community, lastName = 'Unknown') {
  const {prospect} = lead;

  const salesContact = new SalesContact();
  const salesLead = new SalesLead(salesContact);

  salesContact.firstName = ((prospect && prospect.firstName) ? prospect.firstName : 'Unknown')
  salesContact.lastName = ((prospect && prospect.lastName) ? prospect.lastName : lastName);
  salesContact.emailAddress = prospect.email;
  salesContact.age = prospect.age;

  salesLead.inquiryTypeId = prospect.reasonForCall;
  let callingFor = mapInquiryTypeValue(lead.callingFor);
  salesLead.inquirerType = callingFor;
  salesLead.buildingId = community.communityId;
  salesLead.inquiryLeadSourceId = lead.leadSource;
  salesLead.inquiryLeadSourceDetailId = lead.leadSourceDetail;
  salesLead.inquiryDate = toSaleDateFormat(new Date());

  if (salesLead.inquirerType && salesLead.inquirerType === 'PROSP') {
    salesContact.gender = lead.callerType
  }

  return salesLead;
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