import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { get } from 'lodash'

export default (record) => {
    return {
        leadid: record.leadId,
        ccleadid: record.ccLeadId,
        community: record.buildingName,
        hasaddtl: record.hasAddlInfluencers,
        prospectid: get(record, 'prospect.contactId')
        pname: record.prospect ? `${get(record, 'prospect.firstName')} ${get(record, 'prospect.lastName')}` : undefined
    }
}

function LeadDataRecord(record) {
    if (record) {
        this.leadid = record.leadId

        if (record.ccLeadId) {
            this.ccleadid = record.ccLeadId
        }

        this.community = record.buildingName
        this.hasaddtl = record.hasAddlInfluencers

        if (record.prospect) {
            this.prospectid = record.prospect.contactId
            this.pname = record.prospect.firstName + " " + record.prospect.lastName
            if (record.prospect.phoneNumbers) {
                for (let i = 0; i < record.prospect.phoneNumbers.length; i++) {
                    let tmpPhone = record.prospect.phoneNumbers[i];
                    if (tmpPhone) {
                        if (tmpPhone.primary) {
                            if (tmpPhone.phoneNumber) {
                                const pn = parsePhoneNumberFromString("+1" + tmpPhone.phoneNumber);
                                this.pphone = pn.formatNational();
                            }

                            break;
                        }
                    }
                }
            }
            this.pemail = record.prospect.emailAddress
        }

        if (record.primaryInfluencer) {
            this.iname = record.primaryInfluencer.firstName + " " + record.primaryInfluencer.lastName
            if (record.primaryInfluencer.phoneNumbers) {
                for (let i = 0; i < record.primaryInfluencer.phoneNumbers.length; i++) {
                    let tmpPhone = record.primaryInfluencer.phoneNumbers[i];
                    if (tmpPhone) {
                        if (tmpPhone.primary) {
                            if (tmpPhone.phoneNumber) {
                                const pn = parsePhoneNumberFromString("+1" + tmpPhone.phoneNumber);
                                this.iphone = pn.formatNational();
                            }

                            break;
                        }
                    }
                }
            }
            this.iemail = record.primaryInfluencer.emailAddress
        }

        if (record.secondPerson) {
            this.spname = record.secondPerson.firstName + " " + record.secondPerson.lastName
            if (record.secondPerson.phoneNumbers) {
                for (let i = 0; i < record.secondPerson.phoneNumbers.length; i++) {
                    let tmpPhone = record.secondPerson.phoneNumbers[i];
                    if (tmpPhone) {
                        if (tmpPhone.primary) {
                            if (tmpPhone.phoneNumber) {
                                const pn = parsePhoneNumberFromString("+1" + tmpPhone.phoneNumber);
                                this.spphone = pn.formatNational();
                            }

                            break;
                        }
                    }
                }
            }
            this.spemail = record.secondPerson.emailAddress
        }
    }
}