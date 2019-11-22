import { get } from 'lodash'

export default (contact = {}) => ({
    addressType: get(contact, 'address.type', 'Home'),
    active: get(contact, 'address.active', true),
    primary: get(contact, 'address.primary', true),
    addressLine1: get(contact, 'address.line1'),
    addressLine2: get(contact, 'address.line2'),
    city: get(contact, 'address.city'),
    stateProv: get(contact, 'address.state'),
    zipPostalCode: get(contact, 'address.zip'),
})
