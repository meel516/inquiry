import { get } from 'lodash'
import findPrimaryPhone from './find-primary-phone'
import formatPhoneNumber from './format-phone-number'

export default (contact = {}) => {
    const primaryPhone = findPrimaryPhone(contact) || {}
    return {
        contactid: contact.contactId,
        name: `${contact.firstName} ${contact.lastName}`,
        address1: get(contact, 'address.addressLine1'),
        address2: get(contact, 'address.addressLine2'),
        city: get(contact, 'address.city'),
        state: get(contact, 'address.stateProv'),
        zip: get(contact, 'address.zipPostalCode'),
        email: contact.emailAddress,
        phoneType: primaryPhone.phoneType,
        phone: formatPhoneNumber(primaryPhone.phoneNumber)
    }
}
