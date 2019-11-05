export default class Lead {
    constructor(leadId) {
        if (leadId) {
            this.leadId = leadId
            this.umid = undefined
            this.resultOfCall = undefined
        }
    }
}