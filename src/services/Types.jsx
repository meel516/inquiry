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
        debugger
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
        }
    }

    static createLead(salesLead) {
        const lead = new Lead();
        lead.leadId = salesLead.leadId
        lead.prospect = this.createContact(salesLead.salesContact)
        lead.adlNeeds = this.createAdlNeeds();
        lead.memoryConcerns = this.createMemoryConcerns();
        lead.mobilityConcerns = this.createMobilityConcerns();
        lead.nutritionConcerns = this.createNutritionConcerns();
        lead.financialOptions = this.createFinancialOptions();
        lead.drivers = this.createDrivers();

        lead.notes = this.createEmptyNotes();

        return lead;
    }

    static createEmptyLead() {
        const lead = new Lead();
        lead.influencer = this.createEmptyContact();
        lead.influencer.address = this.createEmptyAddress();
        lead.secondPerson = this.createEmptyContact();
        lead.prospect = this.createEmptyContact();
        lead.adlNeeds = this.createAdlNeeds();
        lead.memoryConcerns = this.createMemoryConcerns();
        lead.mobilityConcerns = this.createMobilityConcerns();
        lead.nutritionConcerns = this.createNutritionConcerns();
        lead.financialOptions = this.createFinancialOptions();
        lead.drivers = this.createDrivers();

        lead.notes = this.createEmptyNotes();
        return lead;
    }

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
            if (salesContact.address) {
                const address = this.createEmptyAddress();
                contact.address = address;
            }

            return contact;
        }
        // TODO: do we create an empty contact or do we throw an exception that is caught and alerts the user?
        const contact = this.createEmptyContact();
        contact.address = this.createEmptyAddress();
        return contact;
    }

    static createEmptyAddress() {
        return {
            line1: "",
            line2: "",
            city: "",
            state: "",
            zip: "",
        }
    }

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

    static createFollowupRequest(coid, community) {
        if (coid && community && community.followUpAction) {
            const salesFollowup = new SalesFollowup(coid);
            salesFollowup.followUpActionId = community.followUpAction
            salesFollowup.followUpDate = community.followupDate
            salesFollowup.followUpDescText = community.followUpDescText;

            if (community.freeMeal && community.freeMeal > 0) {
                let index = community.freeMeal;
                const freeMealItems = CommunityService.freeMealListing();
                salesFollowup.followUpDescText = `${salesFollowup.followUpDescText} \n\n Does this visit include a free meal? ${freeMealItems[index]}`
            }

            return salesFollowup;
        }
        return null;
    }

    static createProspectNeedsRequest(coid, lead) {
        if (coid && lead.careType) {
            const salesProspectNeed = new SalesProspectNeed(coid);
            salesProspectNeed.careTypeId = Number(lead.careType);

            if (lead.adlNeeds) {
                salesProspectNeed.bathing = lead.adlNeeds.bathing;
                salesProspectNeed.incontinence = lead.adlNeeds.incontinence;
                salesProspectNeed.transferring = lead.adlNeeds.transferring;
                salesProspectNeed.dressing = lead.adlNeeds.dressing;
                salesProspectNeed.medications = lead.adlNeeds.medications;
                salesProspectNeed.feeding = lead.adlNeeds.feeding;
                salesProspectNeed.toileting = lead.adlNeeds.toileting;
            }

            if (lead.memoryConcerns) {
                salesProspectNeed.alzDiagnosis = lead.memoryConcerns.dementia;
                salesProspectNeed.argumentative = lead.memoryConcerns.memoryLoss;
                salesProspectNeed.forgetsRepeats = lead.memoryConcerns.repeatsStories;
                salesProspectNeed.wandering = lead.memoryConcerns.wandering;
            }

            if (lead.mobilityConcerns) {
                salesProspectNeed.fallRisk = lead.mobilityConcerns.fallRisk;
                salesProspectNeed.walkerRegularly = lead.mobilityConcerns.regularlyWalks;
                salesProspectNeed.caneRegularly = lead.mobilityConcerns.usesCane;
                salesProspectNeed.wheelchairRegularly = lead.mobilityConcerns.usesWheelChair;
                salesProspectNeed.onePersTransfer = lead.mobilityConcerns.personTransfer;
                salesProspectNeed.twoPersTransfer = lead.mobilityConcerns.secondPersonTransfer;
            }

            if (lead.nutritionConcerns) {
                salesProspectNeed.diabetesDiagnosis = lead.nutritionConcerns.diabetes;
                salesProspectNeed.lowSaltLowDiet = lead.nutritionConcerns.lowSalt;
                salesProspectNeed.otherDietRestrictions = lead.nutritionConcerns.prescribedDiet;
                salesProspectNeed.notEatingWell = lead.nutritionConcerns.notEatingWell;
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

    static createProspectRequest(lead, community) {
        if (!lead || !community) return;

        const { prospect, influencer } = lead;
        const defaultLastName = (influencer && influencer.lastName) ? influencer.lastName : 'Unknown';

        const salesContact = new SalesContact();
        const salesLead = new SalesLead(salesContact, 4);

        let callingFor = Util.mapInquiryTypeValue(lead.callingFor)
        if (callingFor === 'PROSP') {
            salesContact.firstName = influencer.firstName;
            salesContact.lastName = influencer.lastName;
            salesContact.emailAddress = influencer.email;
            salesContact.age = prospect.age;
            salesContact.age = prospect.age
            salesContact.veteranStatus = prospect.veteranStatus
            salesContact.currentSituation = lead.currentSituation
            this.addAddressToContact(influencer, salesContact);
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

        salesLead.inquiryTypeId = prospect.reasonForCall
        salesLead.inquirerType = callingFor
        salesLead.buildingId = community.communityId
        salesLead.inquiryLeadSourceId = lead.leadSource
        salesLead.inquiryLeadSourceDetailId = lead.leadSourceDetail
        salesLead.interestReasonId = lead.reasonForCall

        salesLead.salesLeadDriver = lead.drivers;
        salesLead.salesLeadFinancialOption = lead.financialOptions;

        return salesLead;
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