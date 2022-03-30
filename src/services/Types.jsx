import convertToISODate from '../utils/convert-to-iso-date'
import getFreeMealItem from './community-services/get-free-meal-item'
import getPrimaryPhone from '../utils/find-primary-phone'
import mapCallingForToInquiryValue from '../mappers/calling-for-to-inquiry-value'
import Lead from '../models/lead'
import createSalesLead from '../models/sales-lead'
import duplicateContact from '../utils/duplicate-contact'

import {defaultMemoryConcerns} from '../constants/default-memory-concerns'
import {defaultMobilityConcerns} from '../constants/default-mobility-concerns'
import {defaultNutritionConcerns} from '../constants/default-nutrition-concerns'
import {defaultAdlNeeds} from '../constants/default-adl-needs'
import {defaultFinancialOptions} from '../constants/default-financial-options'
import {defaultDrivers} from '../constants/default-drivers'

import addContactPhoneToSalesContact from '../mappers/add-contact-phone-to-sales-contact'
import addContactAddressToSalesContact from '../mappers/add-contact-address-to-sales-contact'

import leadDataRecord from '../models/lead-data-record'

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
            lead.adlNeeds = defaultAdlNeeds;
            lead.memoryConcerns = defaultMemoryConcerns;
            lead.mobilityConcerns = defaultMobilityConcerns;
            lead.nutritionConcerns = defaultNutritionConcerns;
            lead.financialOptions = defaultFinancialOptions;
            lead.drivers = defaultDrivers;
            lead.secondPerson = this.createEmptyContact();
            lead.leadSource = salesLead.inquiryLeadSourceId
            lead.leadSourceDetail = salesLead.inquiryLeadSourceDetailId
            lead.leadSourceSubDetail = salesLead.inquiryLeadSourceSubDetailId
            lead.referralText = salesLead.inquiryLeadSourceReferralText
            lead.leadSource2nd = salesLead.secondInquiryLeadSourceId
            lead.leadSourceDetail2nd = salesLead.secondInquiryLeadSourceDetailId
            lead.leadSourceSubDetail2nd = salesLead.secondInquiryLeadSourceSubDetailId
            lead.referralText2nd = salesLead.secondInquiryLeadSourceReferralText
            lead.leadTypeId = salesLead.leadTypeId
            lead.notes = {}
            lead.inquiryType = salesLead.inquiryTypeId
            lead.leadCareTypeId = salesLead.leadCareTypeId
            lead.callingFor = (salesLead.inquirerType === 'PROSP') ? 'Myself' : 'Other'
            if (salesLead.salesContact) {
                const { salesContact } = salesLead;
                lead.veteranStatus = salesContact.veteranStatus
                lead.prospect = this.createContact(salesContact)
                lead.gender = salesContact.gender
            }
            if (salesLead.leadStage) {
                lead.salesStage = salesLead.leadStage.salesStage;
            } else {
                lead.salesStage = 10;
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
        lead.adlNeeds = defaultAdlNeeds;
        lead.memoryConcerns = defaultMemoryConcerns;
        lead.mobilityConcerns = defaultMobilityConcerns;
        lead.nutritionConcerns = defaultNutritionConcerns;
        lead.financialOptions = defaultFinancialOptions;
        lead.drivers = defaultDrivers;
        lead.notes = {}
        lead.textOptInCheckbox = false;

        return lead;
    }

    static createInfluencer(influencer) {
        if (influencer) {
            const { salesContact } = influencer
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
            contact.textOptInCheckbox = salesContact.textOptInInd;
            
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

    static createFollowupRequest(leadId, community, user) {
        if (leadId && community && community.followUpAction) {
            const salesFollowup = { leadId }
            salesFollowup.buildingId = community.communityId
            salesFollowup.followUpActionId = community.followUpAction
            salesFollowup.followupDate = convertToISODate(community.followupDate);

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

    static createNoteRequest = (leadId, umid, key, noteText, user) => ({
        deleteInd: false,
        bhsInd: false,
        leadId,
        noteTypeId: this.processNoteKey(key),
        noteText,
        username: user.username,
        umId: umid
    })

    static processNoteKey(key) {
        if (key) {
            switch(key) {
                case "situation":
                    return 1;
                case "passionsPersonality":
                    return 2;
                case "financialSituation":
                    return 3;
                case "additionalNotes":
                    return 4;
                case "secondPersonNote":
                    return 5;
                default:
                    return 0;
            }
        }
    }

    static createInfluencerRequest(leadId, influencer, gender, user) {
        let salesContact = {}

        salesContact.firstName = ((influencer && influencer.firstName) ? influencer.firstName : '')
        salesContact.lastName = ((influencer && influencer.lastName) ? influencer.lastName : '')
        salesContact.emailAddress = influencer.email
        salesContact.address = influencer.address
        salesContact.gender = gender
        salesContact.contactId = ((influencer && influencer.contactId) ? influencer.contactId : '')
        salesContact.masterId = ((influencer && influencer.masterId) ? influencer.masterId : '')
        //salesContact.textOptInInd = influencer.textOptInCheckbox
        addContactPhoneToSalesContact(salesContact, influencer)
        addContactAddressToSalesContact(salesContact, influencer)

        return {
            leadId,
            primary: true,
            active: true,
            username: (user) ? user.username : null,
            influencerId: influencer.influencerId,
            interestReasonId: ((influencer && influencer.interestReasonId) ? influencer.interestReasonId : ''),
            salesContact
        }
    }

    static createSecondPersonRequest(leadId, secondPerson, user) {
        if (secondPerson && secondPerson.selected) {
            let salesContact = {}
            const salesLead = createSalesLead(salesContact, 5)
            salesLead.leadId = ((secondPerson && secondPerson.leadId) ? secondPerson.leadId : '')

            const salesSecondPerson = { salesLead }
            salesContact.firstName = ((secondPerson && secondPerson.firstName) ? secondPerson.firstName : '')
            salesContact.lastName = ((secondPerson && secondPerson.lastName) ? secondPerson.lastName : '')
            salesContact.contactId = ((secondPerson && secondPerson.contactId) ? secondPerson.contactId : '')
            salesContact.masterId = ((secondPerson && secondPerson.masterId) ? secondPerson.masterId : '')
            salesContact.emailAddress = secondPerson.email
            addContactPhoneToSalesContact(salesContact, secondPerson)
    
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

        let salesContact = {}
        const salesLead = createSalesLead(salesContact)

        let callingFor = mapCallingForToInquiryValue(lead.callingFor)
        if (callingFor === 'PROSP' && (!lead.hasInfluencers || lead.hasInfluencers === 0)) {
            salesContact.firstName = influencer.firstName
            salesContact.lastName = influencer.lastName
            salesContact.emailAddress = influencer.email
            salesContact.age = prospect.age
            salesContact.veteranStatus = prospect.veteranStatus
            salesContact.currentSituation = lead.currentSituation
            salesContact.contactId = influencer.contactId
            salesContact.masterId = influencer.masterId
            addContactAddressToSalesContact(salesContact, influencer)
            addContactPhoneToSalesContact(salesContact, influencer)
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
            addContactPhoneToSalesContact(salesContact, prospect)
        }

        if (callingFor === 'PROSP') {
            salesContact.textOptInInd = !!lead.textOptInCheckbox
        } else {
            salesContact.textOptInInd = ((prospect && prospect.textOptInCheckbox) ? prospect.textOptInCheckbox : false)
        }

        salesContact.addSubscriber = lead.addSubscriber
        
        salesLead.inquiryTypeId = lead.inquiryType
        salesLead.inquirerType = callingFor

        if (community) {
            salesLead.buildingId = community.communityId
        }

        salesLead.inquiryLeadSourceId = lead.leadSource
        salesLead.inquiryLeadSourceDetailId = lead.leadSourceDetail
        salesLead.inquiryLeadSourceSubDetailId = lead.leadSourceSubDetail
        salesLead.inquiryLeadSourceReferralText = lead.referralText
        salesLead.secondInquiryLeadSourceId = lead.leadSource2nd
        salesLead.secondInquiryLeadSourceDetailId = lead.leadSourceDetail2nd
        salesLead.secondInquiryLeadSourceSubDetailId = lead.leadSourceSubDetail2nd
        salesLead.secondInquiryLeadSourceReferralText = lead.referralText2nd

        salesLead.salesLeadDriver = lead.drivers;
        salesLead.salesLeadFinancialOption = lead.financialOptions;
        salesLead.username = user.username

        // For updates, we will have a leadId...set it.
        if (lead.leadId) {
            salesLead.leadId = lead.leadId;
        }

        if (lead.swapProspect) {
            salesLead.swapProspect = lead.swapProspect;
        }

        if (lead.editContact) {
            salesLead.editContact = lead.editContact;
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
            umId: lead.umid,
        }
    }

    static buildLeadDataResponseForContactId(payload) {
        const returnval = [];

        if (payload) {
            for (let i = 0; i < payload.length; i++) {
                let leadRow = payload[i];
                if (leadRow) {
                    const ldr = leadDataRecord(leadRow);
                    returnval.push(ldr);
                }
            }
        }

        return returnval;
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