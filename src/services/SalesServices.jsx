//import React from 'react'
import DedupRequest from './DedupRequest'
import {createCommunity, freeMealListing} from './CommunityServices'

/*
since this export is not default... on the import you need to do ... import { duplicateCheck } from '../services/duplicateCheck' this is because we don't have a default export
just a normal export
*/
export function checkForDuplicate(contact, address) {
  const endpoint = window.encodeURI(`${process.env.REACT_APP_SALES_SERVICES_URL}/ContactService/api/duplicate/check`);

  const dupRequest = new DedupRequest(contact, address);

  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(dupRequest.payload)
  })
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
  return fetch(url, { mode: 'cors', cache: 'no-cache' })
    .then((res) => res.json())
}

// business logic ------

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

function Lead() { }

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

  return fetch(url, { mode: 'cors', cache: 'no-cache' })
    .then((res) => res.json());
}

export async function submitToService({ lead, communities, actions }) {
  let successful = true;
  console.log('submitting lead form to service');
  debugger;

  if (lead.leadId) {
    console.log(`LeadId: ${lead.leadId}`);
  }
  else {
    const leadUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/prospect`;
    const inflUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/influencer`;
    const noteUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/note`;
    const fuaUrl  = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/fua`;

    // IF zero/many community is selected always assume 64000 community
    if (!doesCommunityListContainContactCenter(communities)) {
      let community = createCommunity();
      community.buildingId = 225707
      communities.push(community);
    }

    for (let i = 0; i < communities.length; i++) {
      let community = communities[i];
      let prospect = createProspectRequest(lead, community);
      console.log(`Submit Request: ${prospect}`);

      try {
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
          console.log('successfully created sales lead')
          const { objectId } = salesResponse;
          console.log(`Sales Lead Id: ${objectId}`);

          let influencer = createInfluencerRequest(objectId, lead.influencer);
          if (influencer) {
            try {
              response = await fetch(inflUrl, {
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
              successful = false;
            }
          }

          let followup = createFollowupRequest(objectId, community)
          if (followup) {
            try {
              response = await fetch(fuaUrl, {
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
            catch(err) {
              console.log(err);
              successful = false;
            }
          }

          // TODO: are notes only added on the contact center COI?
          let notes = lead.notes
          if (notes) {
            for (let [key, value] of Object.entries(notes)) {
              let noteRequest = createNoteRequest(objectId, value);
              try {
                response = await fetch(noteUrl, {
                  method: 'POST', mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(noteRequest),
                })
              }
              catch(err) {

              }
            }
          }

        } else {
          // failed
          console.log('failed to create sales lead')
          actions.setStatus(salesResponse.error.substring(0, 200));
          successful = false;
        }

      } catch (err) {
        console.log(err);
        successful = false;
      }
    }
  }

  actions.setSubmitting(false);
  return successful;
}

function doesCommunityListContainContactCenter(communities) {
  if (communities == null || communities.length === 0) {
    return false
  }
  return communities.includes((community) => {
    return community.buildingId = 225707
  });
}

function SalesContact() {

}

function SalesFollowup(leadId) {
  this.leadId = leadId
}

function SalesInfluencer(leadId, salesContact) {
  this.leadId = leadId
  this.primary = true
  this.active = true
  this.salesContact = salesContact
}


function SalesLead(salesContact) {
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

export function createProspectRequest(lead, community, lastName = 'Unknown') {
  const { prospect } = lead;

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

  if (salesLead.inquirerType && salesLead.inquirerType === 'PROSP') {
    salesContact.gender = lead.callerType
  }

  return salesLead;
}

function createNoteRequest(coid, note) {

}

function createInfluencerRequest(coid, influencer) {
  const salesContact = new SalesContact();
  const salesInfluencer = new SalesInfluencer(coid, salesContact);

  salesContact.firstName = ((influencer && influencer.firstName) ? influencer.firstName : '')
  salesContact.lastName = ((influencer && influencer.lastName) ? influencer.lastName : '')
  salesContact.address = influencer.address
  salesContact.emailAddress = influencer.email

  if ( influencer.phone ) {
    const {number, type} = influencer.phone
    salesContact.phoneNumbers = [];
    salesContact.phoneNumber.push({
      phoneType: type,
      primary: true,
      phoneNumber: number
    })
  }

  return salesInfluencer;
}

function createFollowupRequest(coid, community) {
  if (coid && community && community.followUpAction) {
    const salesFollowup = new SalesFollowup(coid);
    salesFollowup.followUpActionId = community.followUpAction
    salesFollowup.followUpDate = community.followupDate
    salesFollowup.followUpDescText = community.followUpDescText;

    if (community.freeMeal && community.freeMeal > 0) {
      let index = community.freeMeal;
      const freeMealItems = freeMealListing();
      salesFollowup.followUpDescText = `${salesFollowup.followUpDescText} \n\n Does this visit include a free meal? ${freeMealItems[index]}`
    }

    return salesFollowup;
  }
  return null;
}