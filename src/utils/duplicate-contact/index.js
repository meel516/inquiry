import { get, last } from 'lodash'
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

/*

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
*/