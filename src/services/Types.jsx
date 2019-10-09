import { CommunityService } from './CommunityServices'

class Lead {
    constructor(leadId) {
        if (leadId) {
            this.leadId = leadId
        }
    }
}

function ProspectError({ status, message }) {
    this.status = status
    this.message = message
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
        phoneType: "Home",
    }
}

function SalesSecondPerson(salesLead) {
    this.salesLead = salesLead
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

function SalesLead(salesContact, leadTypeId = 4) {
    this.leadTypeId = leadTypeId;
    this.salesContact = salesContact;
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
    if (secondPerson) {
        const salesFormDetailsSecondPerson = new SalesFormDetailsCustomSalesContact(secondPerson);
        this.salesContact = salesFormDetailsSecondPerson;
    }
}

function SalesFormDetailsProspect(lead) {
    if (lead) {
        const salesFormDetailsProspect = new SalesFormDetailsCustomSalesContact(lead.prospect);

        this.salesContact = salesFormDetailsProspect;
        this.interestReasonId = lead.prospect.reasonForCall
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
    if (secondPerson) {
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
    
    this.careTypeId = lead.careTypeId;
    this.currentSituationId = lead.currentSituationId;
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
            veteranStatus: "",
        }
    }

    static createLead(salesLead) {
        const lead = new Lead();
        if (salesLead) {
            lead.leadId = salesLead.leadId
            lead.adlNeeds = this.createAdlNeeds();
            lead.memoryConcerns = this.createMemoryConcerns();
            lead.mobilityConcerns = this.createMobilityConcerns();
            lead.nutritionConcerns = this.createNutritionConcerns();
            lead.financialOptions = this.createFinancialOptions();
            lead.drivers = this.createDrivers();
            lead.leadSource = salesLead.inquiryLeadSourceId
            lead.leadSourceDetail = salesLead.inquiryLeadSourceDetailId
            lead.leadTypeId = salesLead.leadTypeId
            lead.notes = this.createEmptyNotes();
            lead.inquiryType = salesLead.inquiryTypeId
            lead.reasonForCall = salesLead.interestReasonId
            if (salesLead.salesContact) {
                const {salesContact} = salesLead;
                lead.currentSituation = salesContact.currentSituation
                lead.veteranStatus = salesContact.veteranStatus
                lead.prospect = this.createContact(salesContact);
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
        lead.careType = '';
        lead.fua = '';
        lead.callingFor = '';
        lead.inquiryType = '';
        lead.careType = '';
        lead.leadSource = '';
        lead.leadSourceDetail = '';
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
            contact.firstName = salesContact.firstName;
            contact.lastName = salesContact.lastName;
            contact.age = salesContact.age;
            contact.masterId = salesContact.masterId;
            contact.veteranStatus = salesContact.veteranStatus;
            contact.currentSituation = salesContact.currentSituation;
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

    static createFollowupRequest(leadId, community) {
        if (leadId && community && community.followUpAction) {
            const salesFollowup = new SalesFollowup(leadId);
            salesFollowup.buildingId = community.communityId
            salesFollowup.followUpActionId = community.followUpAction
            salesFollowup.followUpDate = CommunityService.convertToISODate(community.followupDate);

            let description = community.note;
            if (community.freeMeal && community.freeMeal > 0) {
                let index = community.freeMeal;
                const freeMealItem = CommunityService.getFreeMealItem(index);
                if (freeMealItem) {
                    description = `${community.note} \n\n Does this visit include a free meal? ${freeMealItem.label}`
                }
            }
            salesFollowup.followUpDescText = description

            return salesFollowup;
        }
        return null;
    }

    static createProspectNeedsRequest(coid, lead) {
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

            return salesProspectNeed;
        }
        return null;
    }

    static createNoteRequest(coid, note) {
        return new SalesNote(coid, note);
    }

    static createInfluencerRequest(coid, influencer) {
        const salesContact = new SalesContact();
        const salesInfluencer = new SalesInfluencer(coid, salesContact);

        salesContact.firstName = ((influencer && influencer.firstName) ? influencer.firstName : '')
        salesContact.lastName = ((influencer && influencer.lastName) ? influencer.lastName : '')
        salesContact.emailAddress = influencer.email
        salesContact.address = influencer.address
        this.addPhoneToContact(influencer, salesContact);
        this.addAddressToContact(influencer, salesContact);

        return salesInfluencer;
    }

    static createSecondPersonRequest(coid, secondperson) {
        const salesContact = new SalesContact();
        const salesLead = new SalesLead(salesContact, 5);
        const salesSecondPerson = new SalesSecondPerson(salesLead);

        salesContact.firstName = ((secondperson && secondperson.firstName) ? secondperson.firstName : '')
        salesContact.lastName = ((secondperson && secondperson.lastName) ? secondperson.lastName : '')
        salesContact.emailAddress = secondperson.email
        this.addPhoneToContact(secondperson, salesContact);

        const primarySalesLead = new SalesLead(null, null);
        primarySalesLead.leadId = coid;
        salesSecondPerson.primarySalesLead = primarySalesLead;

        return salesSecondPerson;
    }

    static createProspectRequest(lead, community, user) {
        if (!lead || !community) return;

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

        salesLead.inquiryTypeId = prospect.inquiryType
        salesLead.inquirerType = callingFor
        salesLead.buildingId = community.communityId
        salesLead.inquiryLeadSourceId = lead.leadSource
        salesLead.inquiryLeadSourceDetailId = lead.leadSourceDetail
        salesLead.interestReasonId = lead.reasonForCall

        salesLead.salesLeadDriver = lead.drivers;
        salesLead.salesLeadFinancialOption = lead.financialOptions;
        salesLead.username = user.username

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
     * creates a request that allows additions for coi methods
     * @param {*} lead 
     * @param {*} community 
     * @param {*} user 
     */
    static createAddCoiRequest(lead, community, user) {
        return {
            leadId: lead.leadId,
            communityId: community.communityId,
            username: user.username,
        }
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
        this.addPhoneToContact(lead.secondPerson, salesFormDetailsSecondPerson.salesLead.salesContact);
        this.addAddressToContact(lead.secondPerson, salesFormDetailsSecondPerson.salesLead.salesContact);
        salesFormDetails.secondPerson = salesFormDetailsSecondPerson;
        
        // Care Type
        salesFormDetails.careType = salesFormDetailsCareType;
        
        // Financial Options
        salesFormDetails.financialOptions = lead.financialOptions;
        
        // Drivers
        salesFormDetails.drivers = lead.drivers;
        
        // Notes
        salesFormDetails.notes = lead.notes;
        
        // Misc.
        salesFormDetails.resultOfCall = lead.fua;
        salesFormDetails.callingFor = lead.callingFor;
        salesFormDetails.additionalDetail = lead.additionalDetail;
        salesFormDetails.callerType = lead.callerType;
        salesFormDetails.situation2 = lead.notes.secondPerson;
        salesFormDetails.umid = lead.umid;
        //salesFormDetails.advisorName = "Matt Matthiessen";
        salesFormDetails.advisorName = oktaFullName;
        salesInquiryForm.formDetails = salesFormDetails;
        
        return salesInquiryForm;
    }
}

export {
    ObjectMappingService,
    ProspectError,
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