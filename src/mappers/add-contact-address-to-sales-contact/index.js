import contactHasAddress from '../../utils/contact-has-address'
import addressMapper from './address-mapper'

export default (salesContact = {}, contact) => {
    if (contactHasAddress(contact)) {
        salesContact.address = addressMapper(contact)
    }
    return salesContact
}
