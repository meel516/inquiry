import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default (phoneNumber) => phoneNumber ? parsePhoneNumberFromString("+1" + phoneNumber).formatNational() : undefined