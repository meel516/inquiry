export default class Lead {
    constructor(leadId) {
        if (leadId) {
            this.leadId = leadId
        }
        this.umid = ''
        this.resultOfCall = ''
        this.careType = undefined
        this.callingFor = ''
        this.inquiryType = undefined
        this.leadSource = undefined
        this.leadSourceDetail = undefined
        this.callerType = ''
    }
}