export default class Lead {
    constructor(leadId) {
        if (leadId) {
            this.leadId = leadId
        }
        this.callerType = '';
        this.callingFor = '';
        this.careType = 0
        this.inquiryType = 0;
        this.leadSource = 0;
        this.leadSourceDetail = 0;
        this.resultOfCall = ''
        this.umid = ''
    }
}