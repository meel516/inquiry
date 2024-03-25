export default class Lead {
    constructor(leadId) {
        if (leadId) {
            this.leadId = leadId
        }
        this.callerType = '';
        this.callingFor = '';
        this.careType = 0;
        this.inquiryType = 0;
        this.leadSource = 0;
        this.leadSourceDetail = 0;
        this.referralText = '';
        this.leadSource2nd = 0;
        this.leadSourceDetail2nd = 0;
        this.referralText2nd = '';
        this.drivers = [];
        this.resultOfCall = '';
        this.reasonForCall = 0;
        this.umid = '';
        this.interestedBuildingName = '';
    }
}