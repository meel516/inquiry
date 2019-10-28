
class TestUtils {

    static addFirstName(contact) {
        contact.firstName = 'James'
        return contact
    }

    static verifyFirstName(contact) {
        expect(contact.firstName).toEqual('James')
        return contact
    }

    static addLastName(contact) {
        contact.lastName = 'Dune'
        return contact
    }

    static verifyLastName(contact) {
        expect(contact.lastName).toEqual('Dune')
        return contact
    }

    static addPhoneNumber(contact) {
        contact.phone.number = '(234) 345-8374'
        return contact
    }

    static verifyPhoneNumber(contact) {
        expect(contact.phone.number).toEqual('(234) 345-8374')
        return contact
    }

    static addPhoneType(contact) {
        contact.phone.type = 'Home';
        return contact;
    }

    static verifyPhoneType(contact) {
        expect(contact.phone.type).toEqual('Home')
        return contact
    }

    static addEmailAddress(contact) {
        contact.email = 'james.dune@gmail.com'
        return contact
    }

    static verifyEmail(contact) {
        expect(contact.email).toEqual('james.dune@gmail.com')
        return contact
    }

    static log(o) {
        console.log(JSON.stringify(o));
    }

    static createEmptyUser() {
        return {
            username: "jdoe",
        }
    }

    static createSampleLead(inquiryType = "INFLU") {
        return {
            salesContact: {
                firstName: "James",
                lastName: "Banner",
                contactId: 14104336,
                masterId: 8575425,
                age: 88,
                veteranStatus: 3,
                currentSituation: 1,
                medicaid: false,
                medicare: false,
            },
            leadStatus: {
                dayRespite: false,
                depositGiven: false,
                leadId: 6861902,
                leadStatusId: 13805382,
                status: 1,
                effectiveDate: "2019-09-24T16:52:41.000+0000"
            },
            buildingId: 225707,
            inquiryLeadSourceId: 16,
            inquiryLeadSourceDetailId: 10001,
            leadId: 6861902,
            leadTypeId: 4,
            inquirerType: inquiryType,
            username: "brookdale-sales-api",
            inquiryDate: "2019-09-24T05:00:00.000+0000"
        }
    }

}

export {
    TestUtils
}