import { get } from 'lodash'

export default (contact) => get(contact, 'phone.number', '')