import { createDuplicateSearchUrl } from '../../constants/url-generator'
import * as request from '../request'
import stripPhoneFormatting from '../../utils/strip-phone-formatting'
import { get } from 'lodash'

export const createContactDuplicationRequest = (contact = {}) => ({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    email: contact.email || '',
    prospectFirstName: '',
    prospectLastName: '',
    phone1: stripPhoneFormatting(get(contact, 'phone.number', '')),
    phoneType: ''
})

export default (contact) => {
    return request.post(createDuplicateSearchUrl(), createContactDuplicationRequest(contact))
        .then(request.jsonResponse)
        .catch(() => { throw new Error('Error Performing Duplicate Search') })
}
