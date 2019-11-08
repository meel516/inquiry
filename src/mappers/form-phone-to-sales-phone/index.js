import stripPhoneFormatting from './strip-phone-formatting'

export default (phone) => ({
    primary: true,
    phoneNumber: stripPhoneFormatting(phone.number),
    phoneType: phone.type,
    phoneId: phone.phoneId
})
