import { TestUtils } from '../../utils/test-utils'
import { ObjectMappingService, Util as Utils } from "../Types"

describe('phone manipulation', () => {
    test('verify creation of phone structure', () => {
        expect(ObjectMappingService.createEmptyPhone()).toEqual({ number: "", type: "" })
    })

})

describe('test influencer mapping', () => {

    test('test null influencer mapping', () => {
        const contact = ObjectMappingService.createInfluencer(null)
        expect(contact.influencerId).toBeUndefined()

        expect(contact.firstName).toEqual('')
        expect(contact.lastName).toEqual('')
    })

    test('test undefined influencer mapping', () => {
        const influencer = ObjectMappingService.createInfluencer(undefined)
        expect(influencer.influencerId).toBeUndefined()

        expect(influencer.firstName).toEqual('')
        expect(influencer.lastName).toEqual('')
        expect(influencer.gender).toEqual('')
        expect(influencer.email).toEqual('')
        expect(influencer.phone).not.toBeNull()
        expect(influencer.phone.number).toEqual('')
        expect(influencer.phone.type).toEqual('')

    })

    test('test valid influencer (salesContact) mapping ', () => {
        const salesInfluencer = {
            primary: true,
            active: true,
            influencerId: 6063498,
            leadId: 6861902,
            username: "brookdale-sales-api",
            salesContact: {
                firstName: "Bruce",
                lastName: "Banner",
                emailAddress: "bruce.banner@gmail.com",
                contactId: 14104337,
                masterId: 8575426,
                medicaid: false,
                medicare: false,
                address: {
                    primary: true,
                    active: false,
                    addressLine1: "2340 Acme Lane",
                    addressLine2: "Suite #450",
                    city: "Jacksonville",
                    stateProv: "WI",
                    zipPostalCode: "53214",
                    addressType: "Home",
                    addressId: 6258495
                },
                phoneNumbers: [
                    {
                        onNationalDoNotCall: false,
                        primary: true,
                        phoneNumber: "4148977894",
                        phoneType: "Home",
                        phoneId: 12083324
                    }
                ],
            }
        }
        const influencer = ObjectMappingService.createInfluencer(salesInfluencer);

        const { salesContact, salesContact: { address, phoneNumbers } } = salesInfluencer;

        expect(influencer.influencerId).toEqual(salesInfluencer.influencerId)
        expect(influencer.contactId).toEqual(salesContact.contactId)
        expect(influencer.address.addressId).toEqual(address.addressId)
        expect(influencer.firstName).toEqual(salesContact.firstName)
        expect(influencer.lastName).toEqual(salesContact.lastName)
        expect(influencer.contactId).toEqual(salesContact.contactId)
        expect(influencer.masterId).toEqual(salesContact.masterId)
        expect(influencer.phone.number).toEqual(phoneNumbers[0].phoneNumber)
        expect(influencer.phone.type).toEqual(phoneNumbers[0].phoneType)
    })
})

describe('test followup mapping', () => {

    test('test happy path where all fields are filled out', () => {
        const leadId = 1;
        const community = {
            uuid: "f5115381-b32b-4c04-8b10-c5173c1cd128",
            communityId: 308282,
            freeMeal: "Lunch",
            followupDate: "2019-10-16T17:44:46.987Z",
            followUpAction: "5",
            note: "Description",
            startingPrice: 2540,
            secondPersonFee: 500,
            communityFee: 1850
        }
        const user = TestUtils.createEmptyUser();
        const request = ObjectMappingService.createFollowupRequest(leadId, community, user)
        expect(request).not.toBeNull()

        expect(request.buildingId).toEqual(community.communityId)
        expect(request.followUpActionId).toEqual(community.followUpAction)
        expect(request.followupDate).toEqual('2019-10-16T11:44:46.987-0600')
        expect(request.followUpDescText).toEqual('Description \n\n Does this visit include a free meal? Lunch')
    })

    test('test case where follow up action not supplied', () => {
        const leadId = 1;
        const community = {
            uuid: "d976b695-8202-4b49-b0f1-0e597e6a2fd7",
            communityId: 308049,
            freeMeal: "",
            followupDate: "2019-10-10T08:15:26.594-0500",
            followUpAction: "",
            startingPrice: 2500,
            secondPersonFee: 500,
            communityFee: 2140
        }
        const request = ObjectMappingService.createFollowupRequest(leadId, community);
        expect(request).toBeNull()

    })
})

describe('test prospect creation', () => {

    test('create prospect request via undefined prospect', () => {
        const prospect = ObjectMappingService.createProspectRequest(undefined);
        expect(prospect).not.toBeNull();
    })

    test('create prospect request via fulled defined prospect', () => {

    })
})

describe('test lead creation', () => {

})

function createMockUser() {
    return {
        email: 'test1@brookdale.com',
        name: 'Test Case',
        username: 'testusername',
        zone: 'America/Chicago',
        locale: 'US',
    }
}