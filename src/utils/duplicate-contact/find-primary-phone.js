import { get, last } from 'lodash'

export default (contact) => last(get(contact, 'phoneNumbers', []).filter(p => p && p.primary && p.phoneNumber))