import contactHasPhoneContacts from '../../utils/contact-has-phone-contacts'
import createPhone from './create-phone'

export default (salesContact = {}, contact = {}) => {
    if (contactHasPhoneContacts(contact)) {
        salesContact.phoneNumbers = [ createPhone(contact.phone) ]
    }
    return salesContact
}
