import salesContactToEloquaContact from '../sales-contact-to-eloqua-contact'

export default (influencer) => !influencer ? {} : { salesContact: salesContactToEloquaContact(influencer) }
