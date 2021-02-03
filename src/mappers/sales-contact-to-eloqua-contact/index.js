/**
 * Creates an Eloqua contact from a sales contact with some optional additional key/value pairs
 */
export default (salesContact = {}, additionalValues = {}) => ({
    contactId: salesContact.contactId,
    firstName: salesContact.firstName,
    lastName: salesContact.lastName,
    gender: salesContact.gender,
    emailAddress: salesContact.email,
    age: salesContact.age,
    veteranStatus: salesContact.veteranStatus,
    textOptInInd: salesContact.textOptInCheckbox,
    ...additionalValues
})
