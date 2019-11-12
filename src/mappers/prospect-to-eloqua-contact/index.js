import salesContactToEloquaContact from '../sales-contact-to-eloqua-contact'

export default (lead) => !lead ? {} : {
    salesContact: salesContactToEloquaContact(lead),
    interestReasonId: lead.reasonForCall,
    inquiryTypeId: lead.inquiryType,
    inquiryLeadSourceId: lead.leadSource,
    inquiryLeadSourceDetailId: lead.leadSourceDetail
}
