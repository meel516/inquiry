export default class Lead {
    constructor(leadId) {
        if (leadId) {
            this.leadId = leadId
        }
        this.umid = ''
        this.resultOfCall = ''
        this.careType = undefined
    }
}