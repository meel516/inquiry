import salesContactToEloquaContact from '../sales-contact-to-eloqua-contact'

export default (secondPerson = {}) => !secondPerson.selected ? {} : { salesLead: {salesContact: salesContactToEloquaContact(secondPerson)} }
