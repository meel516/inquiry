import { get } from 'lodash'

export default (contact = {}) => get(contact, 'email', '') || get(contact, 'phone.number', '')
