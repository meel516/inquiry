import convertToISODate from '../utils/convert-to-iso-date'
import getFreeMealItem from './community-services/get-free-meal-item'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import getPrimaryPhone from '../utils/find-primary-phone'
import stripPhoneFormatting from '../utils/strip-phone-formatting'
import contactHasPhoneContacts from '../utils/contact-has-phone-contacts'
import contactHasAddress from '../utils/contact-has-address'
import mapCallingForToInquiryValue from '../mappers/calling-for-to-inquiry-value'
import Lead from '../models/lead'
import { get } from 'lodash'
import createSalesLead from '../models/sales-lead'
import duplicateContact from '../utils/duplicate-contact'

import secondPersonToEloquaContact from '../mappers/second-person-to-eloqua-contact'
import prospectToEloquaContact from '../mappers/prospect-to-eloqua-contact'
import influencerToEloquaContact from '../mappers/influencer-to-eloqua-contact'
import leadToEloquaCareType from '../mappers/lead-to-eloqua-care-type'

function LeadDataRecord(record) {
    if (record) {
        this.leadid = record.leadId
        
        if (record.ccLeadId) {
            this.ccleadid = record.ccLeadId
        }
        
        this.community = record.buildingName
        this.hasaddtl = record.hasAddlInfluencers

        if (record.prospect) {
            this.prospectid = record.prospect.contactId
            this.pname = record.prospect.firstName + " " + record.prospect.lastName
            if (record.prospect.phoneNumbers) {
                for (let i = 0; i < record.prospect.phoneNumbers.length; i++) {
                    let tmpPhone = record.prospect.phoneNumbers[i];
                    if (tmpPhone) {
                        if (tmpPhone.primary) {
                            if (tmpPhone.phoneNumber) {
                                const pn = parsePhoneNumberFromString("+1" + tmpPhone.phoneNumber);
                                this.pphone = pn.formatNational();
                            }

                            break;
                        }
                    }
                }
            }
            this.pemail = record.prospect.emailAddress
        }

        if (record.primaryInfluencer) {
            this.iname = record.primaryInfluencer.firstName + " " + record.primaryInfluencer.lastName
            if (record.primaryInfluencer.phoneNumbers) {
                for (let i = 0; i < record.primaryInfluencer.phoneNumbers.length; i++) {
                    let tmpPhone = record.primaryInfluencer.phoneNumbers[i];
                    if (tmpPhone) {
                        if (tmpPhone.primary) {
                            if (tmpPhone.phoneNumber) {
                                const pn = parsePhoneNumberFromString("+1" + tmpPhone.phoneNumber);
                                this.iphone = pn.formatNational();
                            }

                            break;
                        }
                    }
                }
            }
            this.iemail = record.primaryInfluencer.emailAddress
        }

        if (record.secondPerson) {
            this.spname = record.secondPerson.firstName + " " + record.secondPerson.lastName
            if (record.secondPerson.phoneNumbers) {
                for (let i = 0; i < record.secondPerson.phoneNumbers.length; i++) {
                    let tmpPhone = record.secondPerson.phoneNumbers[i];
                    if (tmpPhone) {
                        if (tmpPhone.primary) {
                            if (tmpPhone.phoneNumber) {
                                const pn = parsePhoneNumberFromString("+1" + tmpPhone.phoneNumber);
                                this.spphone = pn.formatNational();
                            }

                            break;
                        }
                    }
                }
            }
            this.spemail = record.secondPerson.emailAddress
        }
    }
}

class ObjectMappingService {

    static createEmptyPhone() {
        return {
            number: "",
            type: ""
        }
    }

    static createEmptyContact() {
        return {
            firstName: "",
            lastName: "",
            gender: "",
            email: "",
            phone: this.createEmptyPhone(),
            veteranStatus: undefined,
        }
    }

    static createLead(salesLead) {
        salesLead = salesLead || {}
        const lead = new Lead(salesLead.leadId);
        if (salesLead) {
            lead.adlNeeds = this.createAdlNeeds();
            lead.memoryConcerns = this.createMemoryConcerns();
            lead.mobilityConcerns = this.createMobilityConcerns();
            lead.nutritionConcerns = this.createNutritionConcerns();
            lead.financialOptions = this.createFinancialOptions();
            lead.drivers = this.createDrivers();
            lead.secondPerson = this.createEmptyContact();
            lead.leadSource = salesLead.inquiryLeadSourceId
            lead.leadSourceDetail = salesLead.inquiryLeadSourceDetailId
            lead.leadSourceSubDetail = salesLead.inquiryLeadSourceSubDetailId
            lead.leadTypeId = salesLead.leadTypeId
            lead.notes = this.createEmptyNotes();
            lead.inquiryType = salesLead.inquiryTypeId
            //lead.reasonForCall = salesLead.interestReasonId
            lead.callingFor = (salesLead.inquirerType === 'PROSP') ? 'Myself' : 'Other'
            if (salesLead.salesContact) {
                const {salesContact} = salesLead;
                lead.veteranStatus = salesContact.veteranStatus
                lead.prospect = this.createContact(salesContact)
                lead.gender = salesContact.gender
            }
            lead.buildingId = salesLead.buildingId
        }
        else {
            return this.createEmptyLead();
        }

        return lead;
    }

    static createEmptyLead() {
        const lead = new Lead();
        lead.influencer = this.createEmptyContact();
        lead.influencer.address = this.createEmptyAddress();
        lead.secondPerson = this.createEmptyContact();
        lead.secondPerson.selected = false;
        lead.prospect = this.createEmptyContact();
        lead.prospect.age = '';
        lead.adlNeeds = this.createAdlNeeds();
        lead.memoryConcerns = this.createMemoryConcerns();
        lead.mobilityConcerns = this.createMobilityConcerns();
        lead.nutritionConcerns = this.createNutritionConcerns();
        lead.financialOptions = this.createFinancialOptions();
        lead.drivers = this.createDrivers();
        lead.notes = this.createEmptyNotes();

        return lead;
    }

    static createInfluencer(influencer) {
        if (influencer) {
            const {salesContact} = influencer
            const contact = this.createContact(salesContact)
            contact.influencerId = influencer.influencerId
            return contact;
        }
        return this.createEmptyContact()
    }

    /**
     * translates sales contact to contact form
     * @param {SalesContact} salesContact 
     */
    static createContact(salesContact) {
        if (salesContact) {
            const contact = this.createEmptyContact();
            contact.contactId = salesContact.contactId;
            contact.masterId = salesContact.masterId;
            contact.firstName = salesContact.firstName;
            contact.lastName = salesContact.lastName;
            contact.email = salesContact.emailAddress || '';
            contact.age = salesContact.age;
            contact.gender = salesContact.gender;
            contact.veteranStatus = salesContact.veteranStatus;
            //contact.currentSituation = salesContact.currentSituation;
            const address = this.createEmptyAddress();
            if (salesContact.address) {
                const salesAddress = salesContact.address;
                address.addressId = salesAddress.addressId;
                address.addressType = salesAddress.addressType;
                address.primary = salesAddress.primary;
                address.active = salesAddress.active;
                address.line1 = salesAddress.addressLine1 || '';
                address.line2 = salesAddress.addressLine2 || '';
                address.city = salesAddress.city || '';
                address.state = salesAddress.stateProv || '';
                address.zip = salesAddress.zipPostalCode || '';
            }
            contact.address = address;
            if (salesContact.phoneNumbers) {
                const phone = getPrimaryPhone(salesContact.phoneNumbers);
                if (phone) {
                    contact.phone.number = phone.phoneNumber
                    contact.phone.type = phone.phoneType
                    contact.phone.phoneId = phone.phoneId
                    contact.phone.primary = phone.primary
                }
            }

            return contact;
        }
        // TODO: do we create an empty contact or do we throw an exception that is caught and alerts the user?
        const contact = this.createEmptyContact();
        contact.address = this.createEmptyAddress();
        return contact;
    }

    /**
     * creates an empty address object
     */
    static createEmptyAddress() {
        return {
            line1: "",
            line2: "",
            city: "",
            state: "",
            zip: "",
        }
    }

    /**
     * creates an empty note object
     */
    static createEmptyNotes() {
        return {

        }
    }

    static createAdlNeeds() {
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

    static createMemoryConcerns() {
        return {
            dementia: false,
            memoryLoss: false,
            repeatsStories: false,
            wandering: false,
        }
    }

    static createMobilityConcerns() {
        return {
            fallRisk: false,
            regularlyWalks: false,
            personTransfer: false,
            usesWheelChair: false,
            secondPersonTransfer: false,
            usesCane: false,
        }
    }

    static createNutritionConcerns() {
        return {
            diabetes: false,
            lowSalt: false,
            prescribedDiet: false,
            notEatingWell: false,
        }
    }

    static createFinancialOptions() {
        return {
            aidAttendance: false,
            familyContributions: false,
            homeOwner: false,
            ltcPolicy: false,
        }
    }

    static createDrivers() {
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

    static createPhone = (phone) => ({
        primary: true,
        phoneNumber: stripPhoneFormatting(phone.number),
        phoneType: phone.type,
        phoneId: phone.phoneId
    })

    static addPhoneToContact(contact, salesContact) {
        if (contactHasPhoneContacts(contact)) {
            const phone = this.createPhone(contact.phone);
            salesContact.phoneNumbers = [];
            salesContact.phoneNumbers.push(phone);
        }
    }

    static addAddressToContact = (contact, salesContact) => {
        if (!contactHasAddress(contact) || !salesContact) {
            return
        }
        salesContact.address = {
            addressType: get(contact, 'address.type', 'Home'),
            active: get(contact, 'address.active', true),
            primary: get(contact, 'address.primary', true),
            addressLine1: get(contact, 'address.line1'),
            addressLine2: get(contact, 'address.line2'),
            city: get(contact, 'address.city'),
            stateProv: get(contact, 'address.state'),
            zipPostalCode: get(contact, 'address.zip'),
        }
    }

    static createFollowupRequest(leadId, community, user) {
        if (leadId && community && community.followUpAction) {
            const salesFollowup = { leadId }
            salesFollowup.buildingId = community.communityId
            salesFollowup.followUpActionId = community.followUpAction
            salesFollowup.followUpDate = convertToISODate(community.followupDate);

            let description = community.note;
            if (community.freeMeal) {
                const freeMealItem = getFreeMealItem(community.freeMeal);
                if (freeMealItem) {
                    description = `${community.note} \n\n Does this visit include a free meal? ${freeMealItem.label}`
                }
            }
            salesFollowup.followUpDescText = description
            salesFollowup.username = user.username

            return salesFollowup;
        }
        return null;
    }

    static createProspectNeedsRequest(coid, lead, user) {
        if (coid && lead.careType) {
            const salesProspectNeed = { leadId: coid }
            salesProspectNeed.careTypeId = Number(lead.careType);
            const {adlNeeds, memoryConcerns, mobilityConcerns, nutritionConcerns} = lead

            if (adlNeeds) {
                salesProspectNeed.bathing = adlNeeds.bathing;
                salesProspectNeed.incontinence = adlNeeds.incontinence;
                salesProspectNeed.transferring = adlNeeds.transferring;
                salesProspectNeed.dressing = adlNeeds.dressing;
                salesProspectNeed.medications = adlNeeds.medications;
                salesProspectNeed.feeding = adlNeeds.feeding;
                salesProspectNeed.toileting = adlNeeds.toileting;
            }

            if (memoryConcerns) {
                salesProspectNeed.alzDiagnosis = memoryConcerns.dementia;
                salesProspectNeed.argumentative = memoryConcerns.memoryLoss;
                salesProspectNeed.forgetsRepeats = memoryConcerns.repeatsStories;
                salesProspectNeed.wandering = memoryConcerns.wandering;
            }

            if (mobilityConcerns) {
                salesProspectNeed.fallRisk = mobilityConcerns.fallRisk;
                salesProspectNeed.walkerRegularly = mobilityConcerns.regularlyWalks;
                salesProspectNeed.caneRegularly = mobilityConcerns.usesCane;
                salesProspectNeed.wheelchairRegularly = mobilityConcerns.usesWheelChair;
                salesProspectNeed.onePersTransfer = mobilityConcerns.personTransfer;
                salesProspectNeed.twoPersTransfer = mobilityConcerns.secondPersonTransfer;
            }

            if (nutritionConcerns) {
                salesProspectNeed.diabetesDiagnosis = nutritionConcerns.diabetes;
                salesProspectNeed.lowSaltLowDiet = nutritionConcerns.lowSalt;
                salesProspectNeed.otherDietRestrictions = nutritionConcerns.prescribedDiet;
                salesProspectNeed.notEatingWell = nutritionConcerns.notEatingWell;
            }

            salesProspectNeed.username = user.username

            return salesProspectNeed;
        }
        return null;
    }

    static createNoteRequest = (leadId, noteText, user) => ({
        deleteInd: false,
        bhsInd: false,
        leadId,
        noteText,
        username: user.username
    })

    static createInfluencerRequest(leadId, influencer, gender, user) {
        const salesContact = {}
        const salesInfluencer = {
            leadId,
            primary: true,
            active: true,
            salesContact
        }
        salesInfluencer.username = (user) ? user.username : null

        salesContact.firstName = ((influencer && influencer.firstName) ? influencer.firstName : '')
        salesContact.lastName = ((influencer && influencer.lastName) ? influencer.lastName : '')
        salesContact.emailAddress = influencer.email
        salesContact.address = influencer.address
        salesContact.gender = gender
        salesContact.contactId = ((influencer && influencer.contactId) ? influencer.contactId : '')
        salesContact.masterId = ((influencer && influencer.masterId) ? influencer.masterId : '')
        salesInfluencer.interestReasonId = ((influencer && influencer.interestReasonId) ? influencer.interestReasonId : '')
        this.addPhoneToContact(influencer, salesContact);
        this.addAddressToContact(influencer, salesContact);

        if (influencer.influencerId) {
            salesInfluencer.influencerId = influencer.influencerId;
        }

        return salesInfluencer;
    }

    static createSecondPersonRequest(leadId, secondPerson, user) {
        if (secondPerson && secondPerson.selected) {
            const salesContact = {}
            const salesLead = createSalesLead(salesContact, 5)
            salesLead.leadId = ((secondPerson && secondPerson.leadId) ? secondPerson.leadId : '')

            const salesSecondPerson = { salesLead }
            salesContact.firstName = ((secondPerson && secondPerson.firstName) ? secondPerson.firstName : '')
            salesContact.lastName = ((secondPerson && secondPerson.lastName) ? secondPerson.lastName : '')
            salesContact.contactId = ((secondPerson && secondPerson.contactId) ? secondPerson.contactId : '')
            salesContact.masterId = ((secondPerson && secondPerson.masterId) ? secondPerson.masterId : '')
            salesContact.emailAddress = secondPerson.email
            this.addPhoneToContact(secondPerson, salesContact);
    
            const primarySalesLead = createSalesLead();
            primarySalesLead.leadId = leadId;
            salesSecondPerson.primarySalesLead = primarySalesLead;
            salesSecondPerson.username = user.username;
    
            return salesSecondPerson;
        }
        return null;
    }

    static createProspectRequest(lead, community, user) {
        if (!lead) return;

        const { prospect, influencer } = lead;
        const defaultLastName = (influencer && influencer.lastName) ? influencer.lastName : 'Unknown';

        const salesContact = {}
        const salesLead = createSalesLead(salesContact)

        let callingFor = mapCallingForToInquiryValue(lead.callingFor)
        if (callingFor === 'PROSP') {
            salesContact.firstName = influencer.firstName
            salesContact.lastName = influencer.lastName
            salesContact.emailAddress = influencer.email
            salesContact.age = prospect.age
            salesContact.veteranStatus = prospect.veteranStatus
            salesContact.currentSituation = lead.currentSituation
            salesContact.contactId = influencer.contactId
            salesContact.masterId = influencer.masterId
            this.addAddressToContact(influencer, salesContact)
            this.addPhoneToContact(influencer, salesContact)
            salesContact.gender = lead.callerType
            salesLead.interestReasonId = lead.reasonForCall
        }
        else {
            salesContact.firstName = ((prospect && prospect.firstName) ? prospect.firstName : 'Unknown')
            salesContact.lastName = ((prospect && prospect.lastName) ? prospect.lastName : defaultLastName)
            salesContact.emailAddress = prospect.email
            salesContact.age = prospect.age
            salesContact.veteranStatus = prospect.veteranStatus
            salesContact.currentSituation = lead.currentSituation
            salesContact.contactId = prospect.contactId
            salesContact.masterId = prospect.masterId
            this.addPhoneToContact(prospect, salesContact)
        }

        salesLead.inquiryTypeId = lead.inquiryType
        salesLead.inquirerType = callingFor

        if (community) {
            salesLead.buildingId = community.communityId
        }
        
        salesLead.inquiryLeadSourceId = lead.leadSource
        salesLead.inquiryLeadSourceDetailId = lead.leadSourceDetail
        salesLead.inquiryLeadSourceSubDetailId = lead.leadSourceSubDetail

        salesLead.salesLeadDriver = lead.drivers;
        salesLead.salesLeadFinancialOption = lead.financialOptions;
        salesLead.username = user.username

        // For updates, we will have a leadId...set it.
        if (lead.leadId) {
            salesLead.leadId = lead.leadId;
        }

        return salesLead;
    }

    /**
     * 
     * @param {*} lead 
     * @param {*} community 
     * @param {*} prospect 
     * @param {*} user 
     * @deprecated
     */
    static createLinkedProspectRequest(lead, community, prospect, user) {
        const salesLead = this.createProspectRequest(lead, community, user);
        salesLead.salesContact.contactId = prospect.contactId
        salesLead.salesContact.masterId = prospect.masterId
        return salesLead
    }

    /**
     * creates a request that allows additions for COI(s) and FUA(s) methods
     * @param {*} lead 
     * @param {*} communities 
     * @param {*} user 
     */
    static createAddCommunityRequest(lead, communities, user) {
        return {
            leadId: lead.leadId,
            communities: communities,
            username: user.username,
        }
    }
   
    static buildLeadDataResponseForContactId(payload) {
        const returnval = [];

        if (payload) {
            for (let i = 0; i < payload.length; i++) {
                let leadRow = payload[i];
                if (leadRow) {
                    const ldr = new LeadDataRecord(leadRow);
                    returnval.push(ldr);
                }
            }
        }

        return returnval;
    }

    static createEloquaRequest(lead, communities, oktaUser) {
        const salesFormDetails = {}
        const salesFormDetailsProspect = prospectToEloquaContact(lead);
        const salesFormDetailsInfluencer = influencerToEloquaContact(lead.influencer);
        const salesFormDetailsSecondPerson = secondPersonToEloquaContact(lead.secondPerson);
        const salesFormDetailsCareType = leadToEloquaCareType(lead);
        const salesInquiryForm = {}
        
        // Communities
        salesInquiryForm.communities = communities;
        
        // Prospect
        this.addPhoneToContact(lead.prospect, salesFormDetailsProspect.salesContact);
        this.addAddressToContact(lead.prospect, salesFormDetailsProspect.salesContact);
        salesFormDetails.prospect = salesFormDetailsProspect;

        // Influencer
        this.addPhoneToContact(lead.influencer, salesFormDetailsInfluencer.salesContact);
        this.addAddressToContact(lead.influencer, salesFormDetailsInfluencer.salesContact);
        salesFormDetails.influencer = salesFormDetailsInfluencer;
        
        // Second Person
        if (salesFormDetailsSecondPerson && salesFormDetailsSecondPerson.salesLead) {
            this.addPhoneToContact(lead.secondPerson, salesFormDetailsSecondPerson.salesLead.salesContact);
            this.addAddressToContact(lead.secondPerson, salesFormDetailsSecondPerson.salesLead.salesContact);
            salesFormDetails.secondPerson = salesFormDetailsSecondPerson;
        }
        
        // Care Type
        salesFormDetails.careType = salesFormDetailsCareType;
        
        // Financial Options
        salesFormDetails.financialOptions = lead.financialOptions;
        
        // Drivers
        salesFormDetails.drivers = lead.drivers;
        
        // Notes
        salesFormDetails.notes = lead.notes;
        
        // Misc.
        salesFormDetails.resultOfCall = lead.resultOfCall;
        salesFormDetails.callingFor = lead.callingFor;
        salesFormDetails.additionalDetail = lead.additionalDetail;
        salesFormDetails.callerType = lead.callerType;
        salesFormDetails.situation2 = lead.notes.secondPersonNote;
        salesFormDetails.umid = lead.umid;
        salesFormDetails.advisorName = oktaUser.name;
        salesFormDetails.advisorEmail = oktaUser.email;
        salesInquiryForm.formDetails = salesFormDetails;
        
        return salesInquiryForm;
    }

    static createContactDuplicateGridContent(duplicatecontacts) {
        const returnval = [];

        if (duplicatecontacts) {
            for (let i = 0; i < duplicatecontacts.length; i++) {
                let dupecontact = duplicatecontacts[i];
                if (dupecontact) {
                    const dc = duplicateContact(dupecontact);
                    returnval.push(dc);
                }
            }
        }

        return returnval;
    }
}

export {
    ObjectMappingService
}