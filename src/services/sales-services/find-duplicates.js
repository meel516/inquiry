import urlGenerator from '../../constants/url-generator'
import * as request from '../request'
import stripPhoneFormatting from './strip-phone-formatting'

export const createContactDuplicationRequest = (contact) => ({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: contact.email,
    prospectFirstName: "",
    prospectLastName: "",
    phone1: (contact.phone !== null ? stripPhoneFormatting(contact.phone.number) : ""),
    phoneType: "",
})

export default (contact) => {
    return request.post(urlGenerator.createDuplicateSearchUrl(), createContactDuplicationRequest(contact))
        .then(request.jsonResponse)
        .catch(() => { throw new Error('Error Performing Duplicate Search') })
}
