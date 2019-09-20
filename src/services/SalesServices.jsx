//import React from 'react'
import DedupRequest from './DedupRequest'
import {  createCommunity, freeMealListing } from './CommunityServices'

/*
since this export is not default... on the import you need to do ... import { duplicateCheck } from '../services/duplicateCheck' this is because we don't have a default export
just a normal export
*/
export function checkForDuplicate(contact, address) {
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
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  }
}

function createEmptyNotes() {
  return {

  }
}

function createAdlNeeds() {
  return {
      bathing: false,
      dressing: false,
      feeding: false,
      incontinence: false,
      medications: false,
      toileting: false,
      transferring: false,
    }
}

function createMemoryConcerns() {
  return {
    dementia: false,
    memoryLoss: false,
    repeatsStories: false,
    wandering: false,  
  }
}

function createMobilityConcerns() {
  return {
    fallRisk: false,
    regularlyWalks: false,
    personTransfer: false,
    usesWheelChair: false,
    secondPersonTransfer: false,
    usesCane: false,
  }  
}

function createNutritionConcerns() {
  return {
    diabetes: false,
    lowSalt: false,
    prescribedDiet: false,
    notEatingWell: false,
  }
}

function createFinancialOptions() {
  return {
    aidAttendance: false,
    familyContributions: false,
    homeOwner: false,
    ltcPolicy: false,
  }
}

function createDrivers() {
  return {
    activities: false,
    accessToResidents: false,
    ageInPlace: false,
    care: false,
    location: false,
    peaceOfMind: false,
    petFriendly: false,
    safety: false,
  }
}

function Lead() { }

export function createEmptyLead() {
  const lead = new Lead();
  lead.influencer = createEmptyContact();
  lead.influencer.address = createEmptyAddress();
  lead.secondPerson = createEmptyContact();
  lead.prospect = createEmptyContact();
  lead.adlNeeds = createAdlNeeds();
  lead.memoryConcerns = createMemoryConcerns();
  lead.mobilityConcerns = createMobilityConcerns();
  lead.nutritionConcerns = createNutritionConcerns();
  lead.financialOptions = createFinancialOptions();
  lead.drivers = createDrivers();

  lead.notes = createEmptyNotes();
  return lead;
}

export function createLeadById(guid) {
var url = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/guid/${guid}`;

  return fetch(url, { mode: 'cors', cache: 'no-cache' })
    .then((res) => res.json());
}

async function submitInfluencer(influencer) {
  const inflUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/influencer`;
  if ( influencer ) {
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

async function submitFollowup(leadId, community) {
  const fuaUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/fua`;

  let followup = createFollowupRequest(leadId, community)
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
async function submitNotes(coid, notes) {
  const noteUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/note`;
  debugger;

  for (let [key, value] of Object.entries(notes)) {
    console.log(`Note: ${key}`);
    if (value && value.trim().length > 0) {
      let noteRequest = createNoteRequest(coid, value);
      fetch(noteUrl, {
          method: 'POST', mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(noteRequest),
      })
      .then(res =>  res.json())
      .catch(err => console.log(err))
    }
  }
}
                  
/**
 * Processes the submission of the contact center to the sales system based upon
 * input from the inquiry form.
 * 
 * @param {lead} lead the form lead object
 * @param {Community} community an object representing the contact center
 */
async function processContactCenter(lead, community) {
  const leadUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/prospect`;
  debugger;

  let prospect = createProspectRequest(lead, community);
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
      const { objectId } = salesResponse;
      lead.leadId = objectId
      console.log(`Sales Lead Id: ${objectId}`);

      if (prospect.inquirerType !== 'PROSP') {
        const influencer = createInfluencerRequest(objectId, lead.influencer);
        submitInfluencer(influencer);
      }

      const notes = lead.notes
      if (notes) {
        submitNotes(objectId, notes);
      }

      return objectId;
    }

  } catch (err) {
    console.log(err);
    // successful = false;
  }
}

async function handleProspectSubmission(lead, community) {
  const leadUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/prospect`;

  let prospect = createProspectRequest(lead, community);

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

  throw new ProspectError(response.status, (response.statusText||'Unable to communicate to server.'))
}

function ProspectError({status, message}) {
  this.status = status
  this.message = message
}

async function retrieveProspect(leadId) {
  const prospectUrl = `${process.env.REACT_APP_SALES_SERVICES_URL}/Sims/api/leads/${leadId}/prospect`

  // already returning json from this fetch
  const prospect = await createFetch(prospectUrl)
  return prospect;
}

async function handleNewInquiryForm(lead, communities, actions) {

  const communityList = [...communities];

  // IF zero/many community is selected always assume 64000 community
  let leadId = null;
  if (!containContactCenter(communities)) {
    let community = createCommunity();
    community.communityId = 225707
    leadId = await processContactCenter(lead, community);
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
      leadId = await processContactCenter(lead, contactCenter);
    }
  }

  if (leadId == null) {
    leadId = lead.leadId;
  }

  if (leadId != null) {
    let prospect = await retrieveProspect(leadId);
    for (let i = 0; i < communityList.length; i++) {
      let community = communityList[i];
      handleProspectSubmission(community, prospect);

      submitFollowup(leadId, community);

    }
  }
}

function handleExistingInquiryForm(lead, communities, actions) {

}

export async function submitToService({ lead, communities, actions }) {
  let successful = true;
  console.log('submitting lead form to service');

  if (lead.leadId) {
    console.log(`LeadId: ${lead.leadId}`);
    handleExistingInquiryForm(lead, communities, actions)
  }
  else {
    handleNewInquiryForm(lead, communities, actions)
  }
  actions.setSubmitting(false);
  return successful;
}

function containContactCenter(communities) {
  if (communities == null || communities.length === 0) {
    return false
  }
  return communities.includes((community) => {
    return isContactCenter(community)
  });
}

function isContactCenter(community) {
  return (community && community.buildingId === 225707)
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

function SalesPhone(number, type) {
  return {
    primary: true,
    phoneNumber: number,
    phoneType: "Home",
  }
}

function SalesNote(leadId, note) {
  this.deleteInd = false
  this.bhsInd = false
  this.leadId = leadId
  this.noteText = note
}

function SalesAddress({ type = 'Home', active = true, primary = true }) {
  this.addressType = type
  this.active = active
  this.primary = primary
}

function SalesLead(salesContact) {
  this.leadTypeId = 4;
  this.salesContact = salesContact;
}

function stripPhoneFormatting(phone) {
  if (phone == null) return null;
  return phone.replace(/\D/g,'');
}

function createPhone(phone) {
  let { number, type } = phone;
  number = stripPhoneFormatting(number);
  return new SalesPhone(number, type);
}

function mapInquiryTypeValue(callingFor) {
  if (callingFor && callingFor === 'Myself') {
    return 'PROSP'
  }
  else {
    return 'INFLU'
  }
}

function addPhoneToContact(contact, salesContact) {
  if (hasPhoneContacts(contact)) {
    const phone = createPhone(contact.phone);
    salesContact.phoneNumbers = [];
    salesContact.phoneNumbers.push(phone);
  }
}

function addAddressToContact(contact, salesContact) {
  if (hasAddress(contact)) {
    const { address } = contact;
    const salesAddress = new SalesAddress(address);
    salesAddress.addressLine1 = address.line1
    salesAddress.addressLine2 = address.line2
    salesAddress.city = address.city
    salesAddress.stateProv = address.state
    salesAddress.zipPostalCode = address.zip
    salesContact.address = salesAddress
  }
}

function hasAddress(contact) {
  if (!contact) return false;
  if (contact && contact.address) return true;
}

function hasPhoneContacts(contact) {
  if (!contact) return false;
  if (contact && contact.phone && contact.phone.number.length > 0) return true;
}

export function createProspectRequest(lead, community, lastName = 'Unknown') {
  const { prospect } = lead;

  const salesContact = new SalesContact();
  const salesLead = new SalesLead(salesContact);

  salesContact.firstName = ((prospect && prospect.firstName) ? prospect.firstName : 'Unknown')
  salesContact.lastName = ((prospect && prospect.lastName) ? prospect.lastName : lastName)
  salesContact.emailAddress = prospect.email
  salesContact.age = prospect.age
  salesContact.veteranStatus = prospect.veteranStatus
  salesContact.currentSituation = lead.currentSituation
  addPhoneToContact(prospect, salesContact)

  salesLead.inquiryTypeId = prospect.reasonForCall
  let callingFor = mapInquiryTypeValue(lead.callingFor)
  salesLead.inquirerType = callingFor
  salesLead.buildingId = community.communityId
  salesLead.inquiryLeadSourceId = lead.leadSource
  salesLead.inquiryLeadSourceDetailId = lead.leadSourceDetail
  salesLead.interestReasonId = lead.reasonForCall

  if (salesLead.inquirerType && salesLead.inquirerType === 'PROSP') {
    salesContact.gender = lead.callerType
  }

  return salesLead;
}

function createNoteRequest(coid, note) {
  return new SalesNote(coid, note);
}

function createInfluencerRequest(coid, influencer) {
  const salesContact = new SalesContact();
  const salesInfluencer = new SalesInfluencer(coid, salesContact);

  salesContact.firstName = ((influencer && influencer.firstName) ? influencer.firstName : '')
  salesContact.lastName = ((influencer && influencer.lastName) ? influencer.lastName : '')
  salesContact.emailAddress = influencer.email
  salesContact.address = influencer.address
  addPhoneToContact(influencer, salesContact);
  addAddressToContact(influencer, salesContact);

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
