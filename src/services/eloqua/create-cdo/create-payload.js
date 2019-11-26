import secondPersonToEloquaContact from '../../../mappers/second-person-to-eloqua-contact'
import prospectToEloquaContact from '../../../mappers/prospect-to-eloqua-contact'
import influencerToEloquaContact from '../../../mappers/influencer-to-eloqua-contact'
import leadToEloquaCareType from '../../../mappers/lead-to-eloqua-care-type'
import addContactPhoneToSalesContact from '../../../mappers/add-contact-phone-to-sales-contact'
import addContactAddressToSalesContact from '../../../mappers/add-contact-address-to-sales-contact'

export default (lead, communities, userName, userEmail) => {
    const formDetails = {}
    const salesFormDetailsProspect = prospectToEloquaContact(lead);
    salesFormDetailsProspect.salesContact = addContactPhoneToSalesContact(salesFormDetailsProspect.salesContact, lead.prospect)
    salesFormDetailsProspect.salesContact = addContactAddressToSalesContact(salesFormDetailsProspect.salesContact, lead.prospect)
    formDetails.prospect = salesFormDetailsProspect;

    // Influencer
    const salesFormDetailsInfluencer = influencerToEloquaContact(lead.influencer);
    salesFormDetailsInfluencer.salesContact = addContactPhoneToSalesContact(salesFormDetailsInfluencer.salesContact, lead.influencer)
    salesFormDetailsInfluencer.salesContact = addContactAddressToSalesContact(salesFormDetailsInfluencer.salesContact, lead.influencer)
    formDetails.influencer = salesFormDetailsInfluencer;
    
    // Second Person
    const salesFormDetailsSecondPerson = secondPersonToEloquaContact(lead.secondPerson);
    if (salesFormDetailsSecondPerson && salesFormDetailsSecondPerson.salesLead) {
        salesFormDetailsSecondPerson.salesLead.salesContact = addContactPhoneToSalesContact(salesFormDetailsSecondPerson.salesLead.salesContact, lead.secondPerson)
        salesFormDetailsSecondPerson.salesLead.salesContact = addContactAddressToSalesContact(salesFormDetailsSecondPerson.salesLead.salesContact, lead.secondPerson)
        formDetails.secondPerson = salesFormDetailsSecondPerson;
    }
    
    // Care Type
    const salesFormDetailsCareType = leadToEloquaCareType(lead);
    formDetails.careType = salesFormDetailsCareType;
    
    // Financial Options
    formDetails.financialOptions = lead.financialOptions;
    
    // Drivers
    formDetails.drivers = lead.drivers;
    
    // Notes
    formDetails.notes = lead.notes;
    
    // Misc.
    formDetails.resultOfCall = lead.resultOfCall;
    formDetails.callingFor = lead.callingFor;
    formDetails.callerType = lead.callerType;
    formDetails.situation2 = lead.notes.secondPersonNote;
    formDetails.umid = lead.umid;
    formDetails.advisorUsername = userName;
    formDetails.advisorEmail = userEmail;

    return {
        communities,
        formDetails
    }
}
