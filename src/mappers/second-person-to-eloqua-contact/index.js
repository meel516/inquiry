import salesContactToEloquaContact from '../sales-contact-to-eloqua-contact'

export default (secondPerson = {}) => !secondPerson.selected ? {} : { salesContact: salesContactToEloquaContact(secondPerson) }
