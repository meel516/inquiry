import salesContactToEloquaContact from '../sales-contact-to-eloqua-contact'
import salesLeadStatusFromLead from '../sales-lead-status-from-lead'

export default (lead) => !lead ? {} : {
    salesContact: salesContactToEloquaContact(lead.prospect),
    interestReasonId: lead.reasonForCall,
    inquiryTypeId: lead.inquiryType,
    inquiryLeadSourceId: lead.leadSource,
    inquiryLeadSourceDetailId: lead.leadSourceDetail,
    inquiryLeadSourceSubDetailId: lead.leadSourceSubDetail,
    influencerCallingFor: lead.callingFor,
    leadStatus: salesLeadStatusFromLead(lead)
}
