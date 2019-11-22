import stripPhoneFormatting from '../../utils/strip-phone-formatting'

export default (phone = {}) => ({
    primary: true,
    phoneNumber: stripPhoneFormatting(phone.number),
    phoneType: phone.type,
    phoneId: phone.phoneId
})
