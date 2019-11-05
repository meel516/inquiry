import convertToISODate from '../utils/convert-to-iso-date'
import getFreeMealItem from './community-services/get-free-meal-item'
import { parsePhoneNumberFromString } from 'libphonenumber-js'


class ServerError extends Error {
    constructor(status, message, entity, ...params) {
        super(...params)

        this.status = status;
        this.message = message;
        this.entity = entity;
    }
}

class AppError extends Error {
    constructor(status, message, entity, ...params) {
        super(...params)

        this.status = status;
        this.message = message;
        this.entity = entity;
    }
}

class Lead {
    constructor(leadId) {
        if (leadId) {
            this.leadId = leadId
            this.umid = undefined
            this.resultOfCall = undefined
        }
    }
}

function SalesContact() {
}

function SalesFollowup(leadId) {
    this.leadId = leadId
}

function SalesProspectNeed(leadId) {
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
        phoneType: type,
    }
}

function SalesSecondPerson(salesLead) {
    this.salesLead = salesLead
}

function SalesNote(leadId, note, user) {
    this.deleteInd = false
    this.bhsInd = false
    this.leadId = leadId
    this.noteText = note
    this.username = user.username
}

function SalesAddress({ type = 'Home', active = true, primary = true }) {
    this.addressType = type
    this.active = active
    this.primary = primary
}

function SalesLead(salesContact, leadTypeId = 4) {
    this.leadTypeId = leadTypeId;
    this.salesContact = salesContact;
}

function DuplicateContact(dupecontact) {
    if (dupecontact) {
        this.contactid = dupecontact.contactId
        this.name = dupecontact.firstName + " " + dupecontact.lastName

        if (dupecontact.phoneNumbers) {
            for (let i = 0; i < dupecontact.phoneNumbers.length; i++) {
                let tmpPhone = dupecontact.phoneNumbers[i];
                if (tmpPhone) {
                    if (tmpPhone.primary) {
                        if (tmpPhone.phoneNumber) {
                            const pn = parsePhoneNumberFromString("+1" + tmpPhone.phoneNumber);
                            this.phone = pn.formatNational();
                        }

                        this.phonetype = tmpPhone.phoneType
                        break;
                    }
                }
            }
        }

        this.email = dupecontact.emailAddress
        
        if (dupecontact.address) {
            this.address1 = dupecontact.address.addressLine1
            this.address2 = dupecontact.address.addressLine2
            this.city = dupecontact.address.city
            this.state = dupecontact.address.stateProv
            this.zip = dupecontact.address.zipPostalCode
        }
    }
}

function LeadDataRecord(record) {
    if (record) {
        this.leadid = record.leadId
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

function SalesInquiryForm() {
}

function SalesFormDetails() {
}

function SalesFormDetailsCustomSalesContact(salesContact) {
    if (salesContact) {
        this.firstName = salesContact.firstName;
        this.lastName = salesContact.lastName;
        this.gender = salesContact.gender;
        this.emailAddress = salesContact.email;
        this.age = salesContact.age;
        this.veteranStatus = salesContact.veteranStatus;
    }
}

function SalesFormDetailsSecondPersonSalesLead(secondPerson) {
    if (secondPerson && secondPerson.selected) {
        const salesFormDetailsSecondPerson = new SalesFormDetailsCustomSalesContact(secondPerson);
        this.salesContact = salesFormDetailsSecondPerson;
    }
}

function SalesFormDetailsProspect(lead) {
    if (lead) {
        const salesFormDetailsProspect = new SalesFormDetailsCustomSalesContact(lead.prospect);

        this.salesContact = salesFormDetailsProspect;
        this.interestReasonId = lead.reasonForCall
        this.inquiryTypeId = lead.inquiryType
        this.inquiryLeadSourceId = lead.leadSource
        this.inquiryLeadSourceDetailId = lead.leadSourceDetail
    }
}

function SalesFormDetailsInfluencer(influencer) {
    if (influencer) {
        const salesFormDetailsInfluencer = new SalesFormDetailsCustomSalesContact(influencer);
        this.salesContact = salesFormDetailsInfluencer;
    }
}

function SalesFormDetailsSecondPerson(secondPerson) {
    if (secondPerson && secondPerson.selected) {
        this.salesLead = new SalesFormDetailsSecondPersonSalesLead(secondPerson);
    }
}

function SalesFormDetailsCareType(lead) {
    if (lead.adlNeeds) {
        this.bathing = lead.adlNeeds.bathing; 
        this.incontinence = lead.adlNeeds.incontinence; 
        this.transferring = lead.adlNeeds.transferring; 
        this.dressing = lead.adlNeeds.dressing; 
        this.medications = lead.adlNeeds.medications; 
        this.feeding = lead.adlNeeds.feeding; 
        this.toileting = lead.adlNeeds.toileting; 
    }
    
    if (lead.memoryConcerns) {
        this.alzDiagnosis = lead.memoryConcerns.dementia; 
        this.argumentative = lead.memoryConcerns.memoryLoss; 
        this.forgetsRepeats = lead.memoryConcerns.repeatsStories; 
        this.wandering = lead.memoryConcerns.wandering; 
    }
    
    if (lead.mobilityConcerns) {
        this.fallRisk = lead.mobilityConcerns.fallRisk; 
        this.walkerRegularly = lead.mobilityConcerns.regularlyWalks; 
        this.caneRegularly = lead.mobilityConcerns.usesCane; 
        this.wheelchairRegularly = lead.mobilityConcerns.usesWheelChair; 
        this.onePersTransfer = lead.mobilityConcerns.personTransfer; 
        this.twoPersTransfer = lead.mobilityConcerns.secondPersonTransfer; 
    }
    
    if (lead.nutritionConcerns) {
        this.diabetesDiagnosis = lead.nutritionConcerns.diabetes; 
        this.lowSaltLowDiet = lead.nutritionConcerns.lowSalt; 
        this.otherDietRestrictions = lead.nutritionConcerns.prescribedDiet; 
        this.notEatingWell = lead.nutritionConcerns.notEatingWell;
    }
    
    this.careTypeId = lead.careType;
    this.currentSituationId = lead.currentSituation;
}

class Util {

    static stripPhoneFormatting(phone) {
        if (phone == null) return null;
        return phone.replace(/\D/g, '');
    }

    static mapInquiryTypeValue(callingFor) {
        if (callingFor && callingFor === 'Myself') {
            return 'PROSP'
        }
        else {
            return 'INFLU'
        }
    }

    static hasAddress(contact) {
        if (!contact) return false;
        if (contact && contact.address) return true;
    }

    static isAddressEmpty(address) {
        if (!address) return false;

    }

    static hasPhoneContacts(contact) {
        if (!contact) return false;
        if (contact && contact.phone && contact.phone.number.length > 0) return true;
    }

    /**
     * checks to see if the contact has a first/last name if so then it's not empty,
     * otherwise if either/both are missing it is considered empty.
     * @param {Contact} contact 
     */
    static isContactEmpty(contact) {
        if (contact) {
            if (!contact.firstName || !contact.lastName) {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
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
            veteranStatus: -1,
        }
    }

    static createLead(salesLead) {
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
            lead.leadTypeId = salesLead.leadTypeId
            lead.notes = this.createEmptyNotes();
            lead.inquiryType = salesLead.inquiryTypeId
            lead.reasonForCall = salesLead.interestReasonId
            lead.careType = 0
            lead.callingFor = (salesLead.inquirerType === 'PROSP') ? 'Myself' : 'Other'
            if (salesLead.salesContact) {
                const {salesContact} = salesLead;
                lead.veteranStatus = salesContact.veteranStatus
                lead.prospect = this.createContact(salesContact)
                lead.gender = salesContact.gender
            }
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
        lead.umid = '';
        lead.resultOfCall = '';
        lead.callingFor = '';
        lead.inquiryType = -1;
        lead.careType = 0;
        lead.leadSource = -1;
        lead.leadSourceDetail = -1;
        lead.callerType = '';

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
            contact.email = salesContact.emailAddress;
            contact.age = salesContact.age;
            contact.gender = salesContact.gender;
            contact.veteranStatus = salesContact.veteranStatus;
            //contact.currentSituation = salesContact.currentSituation;
            const address = this.createEmptyAddress();
            if (salesContact.address) {
                const salesAddress = salesContact.address
                address.addressId = salesAddress.addressId
                address.addressType = salesAddress.addressType
                address.primary = salesAddress.primary
                address.active = salesAddress.active
                address.line1 = salesAddress.addressLine1
                address.line2 = salesAddress.addressLine2
                address.city = salesAddress.city
                address.state = salesAddress.stateProv
                address.zip = salesAddress.zipPostalCode
            }
            contact.address = address;
            if (salesContact.phoneNumbers) {
                const phone = salesContact.phoneNumbers[0];
                contact.phone.number = phone.phoneNumber
                contact.phone.type = phone.phoneType
                contact.phone.phoneId = phone.phoneId
                contact.phone.primary = phone.primary
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

    static createPhone(phone) {
        let { number, type } = phone;
        number = Util.stripPhoneFormatting(number);
        return new SalesPhone(number, type);
    }

    static addPhoneToContact(contact, salesContact) {
        if (Util.hasPhoneContacts(contact)) {
            const phone = this.createPhone(contact.phone);
            salesContact.phoneNumbers = [];
            salesContact.phoneNumbers.push(phone);
        }
    }

    static addAddressToContact(contact, salesContact) {
        if (Util.hasAddress(contact)) {
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

    static createFollowupRequest(leadId, community, user) {
        if (leadId && community && community.followUpAction) {
            const salesFollowup = new SalesFollowup(leadId);
            salesFollowup.buildingId = community.communityId
            salesFollowup.followUpActionId = community.followUpAction
            salesFollowup.followUpDate = convertToISODate(community.followupDate);

            let description = community.note;
            if (community.freeMeal && community.freeMeal > 0) {
                let index = community.freeMeal;
                const freeMealItem = getFreeMealItem(index);
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
            const salesProspectNeed = new SalesProspectNeed(coid);
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

    static createNoteRequest(leadId, note, user) {
        return new SalesNote(leadId, note, user);
    }

    static createInfluencerRequest(leadId, influencer, gender, user) {
        const salesContact = new SalesContact();
        const salesInfluencer = new SalesInfluencer(leadId, salesContact);
        salesInfluencer.username = (user) ? user.username : null

        salesContact.firstName = ((influencer && influencer.firstName) ? influencer.firstName : '')
        salesContact.lastName = ((influencer && influencer.lastName) ? influencer.lastName : '')
        salesContact.emailAddress = influencer.email
        salesContact.address = influencer.address
        salesContact.gender = gender
        salesContact.contactId = ((influencer && influencer.contactId) ? influencer.contactId : '')
        salesContact.masterId = ((influencer && influencer.masterId) ? influencer.masterId : '')
        this.addPhoneToContact(influencer, salesContact);
        this.addAddressToContact(influencer, salesContact);

        return salesInfluencer;
    }

    static createSecondPersonRequest(leadId, secondPerson, user) {
        if (secondPerson && secondPerson.selected) {
            const salesContact = new SalesContact();
            const salesLead = new SalesLead(salesContact, 5);
            const salesSecondPerson = new SalesSecondPerson(salesLead);
    
            salesContact.firstName = ((secondPerson && secondPerson.firstName) ? secondPerson.firstName : '')
            salesContact.lastName = ((secondPerson && secondPerson.lastName) ? secondPerson.lastName : '')
            salesContact.emailAddress = secondPerson.email
            this.addPhoneToContact(secondPerson, salesContact);
    
            const primarySalesLead = new SalesLead(null, null);
            primarySalesLead.leadId = leadId;
            console.log(`Second Person Primary Lead Id: ${leadId}`)
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

        const salesContact = new SalesContact();
        const salesLead = new SalesLead(salesContact, 4);

        let callingFor = Util.mapInquiryTypeValue(lead.callingFor)
        if (callingFor === 'PROSP') {
            salesContact.firstName = influencer.firstName
            salesContact.lastName = influencer.lastName
            salesContact.emailAddress = influencer.email
            salesContact.age = prospect.age
            salesContact.veteranStatus = prospect.veteranStatus
            salesContact.currentSituation = lead.currentSituation
            this.addAddressToContact(influencer, salesContact)
            this.addPhoneToContact(influencer, salesContact)
            salesContact.gender = lead.callerType
        }
        else {
            salesContact.firstName = ((prospect && prospect.firstName) ? prospect.firstName : 'Unknown')
            salesContact.lastName = ((prospect && prospect.lastName) ? prospect.lastName : defaultLastName)
            salesContact.emailAddress = prospect.email
            salesContact.age = prospect.age
            salesContact.veteranStatus = prospect.veteranStatus
            salesContact.currentSituation = lead.currentSituation
            this.addPhoneToContact(prospect, salesContact)
        }

        salesLead.inquiryTypeId = lead.inquiryType
        salesLead.inquirerType = callingFor

        if (community) {
            salesLead.buildingId = community.communityId
        }
        
        salesLead.inquiryLeadSourceId = lead.leadSource
        salesLead.inquiryLeadSourceDetailId = lead.leadSourceDetail
        salesLead.interestReasonId = lead.reasonForCall

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

    static createEloquaExternalRequest(lead, communities, oktaFullName) {
        const salesFormDetails = new SalesFormDetails();
        const salesFormDetailsProspect = new SalesFormDetailsProspect(lead);
        const salesFormDetailsInfluencer = new SalesFormDetailsInfluencer(lead.influencer);
        const salesFormDetailsSecondPerson = new SalesFormDetailsSecondPerson(lead.secondPerson);
        const salesFormDetailsCareType = new SalesFormDetailsCareType(lead);
        const salesInquiryForm = new SalesInquiryForm();
        
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
        salesFormDetails.situation2 = lead.notes.secondPerson;
        salesFormDetails.umid = lead.umid;
        salesFormDetails.advisorName = oktaFullName;
        salesInquiryForm.formDetails = salesFormDetails;
        
        return salesInquiryForm;
    }

    static createContactDuplicateGridContent(duplicatecontacts) {
        const returnval = [];

        if (duplicatecontacts) {
            for (let i = 0; i < duplicatecontacts.length; i++) {
                let dupecontact = duplicatecontacts[i];
                if (dupecontact) {
                    const dc = new DuplicateContact(dupecontact);
                    returnval.push(dc);
                }
            }
        }

        return returnval;
    }
}

export {
    ObjectMappingService,
    ServerError,
    AppError,
    SalesContact,
    SalesFollowup,
    SalesProspectNeed,
    SalesInfluencer,
    SalesPhone,
    SalesSecondPerson,
    SalesNote,
    SalesAddress,
    SalesLead,
    Lead,
    Util,
}