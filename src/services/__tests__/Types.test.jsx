import { TestUtils } from '../../utils/test-utils'
import { ObjectMappingService, Util as Utils } from "../Types"

describe('phone manipulation', () => {

    test('test phone number digits only', () => {
        expect(Utils.stripPhoneFormatting('(414) 404-3453')).toEqual('4144043453')
    })

    test('verify creation of phone structure', () => {
        expect(ObjectMappingService.createEmptyPhone()).toEqual({ number: "", type: "" })
    })

})

describe('address manipulation', () => {

    test('verify contact does not have address', () => {
        const contact = ObjectMappingService.createEmptyContact();
        expect(Utils.hasAddress(contact)).toBeFalsy()
    })

    test('verify contact does have address', () => {
        const contact = ObjectMappingService.createEmptyContact();
        contact.address = ObjectMappingService.createEmptyAddress();
        expect(Utils.hasAddress(contact)).toBeTruthy();
    })

    test('test address is not valid', () => {
        expect(Utils.isAddressEmpty(null)).toBeFalsy();
    })

})

describe('Calling For field tests', () => {

    test('test Caller is calling for "MySelf" which is mapped to Prospect', () => {
        const callingFor = "Myself";
        expect(Utils.mapInquiryTypeValue(callingFor)).toBe('PROSP');
    })

    test('test Caller is not mapped to "MySelf" which is mapped to Influencer', () => {
        const callingFor = '';
        expect(Utils.mapInquiryTypeValue(callingFor)).toBe('INFLU')
    })

    test('test option not selected for Caller which defaults to Influencer', () => {
        expect(Utils.mapInquiryTypeValue(null)).toBe('INFLU')
        expect(Utils.mapInquiryTypeValue(undefined)).toBe('INFLU')
        expect(Utils.mapInquiryTypeValue('')).toBe('INFLU')
    })

})

describe('test contact manipulation', () => {

    test('test contact is empty', () => {
        expect(Utils.isContactEmpty(null)).toBeTruthy();
    })

    test('test undefined contact is empty', () => {
        expect(Utils.isContactEmpty(undefined)).toBeTruthy()
    })

    test('test empty contact still empty', () => {
        const contact = ObjectMappingService.createEmptyContact();
        expect(Utils.isContactEmpty(contact)).toBeTruthy()
    })

    test('test first name only still empty', () => {
        const contact = ObjectMappingService.createEmptyContact();
        TestUtils.addFirstName(contact)
        expect(Utils.isContactEmpty(contact)).toBeTruthy()
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
        expect(influencer.veteranStatus).toEqual('')
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
        expect(request.followUpDate).toEqual('2019-10-16T12:44:46.987-0500')
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

describe('test prospect needs', () => {
    describe('test edge cases', () => {
        test('test null inputs for prospect needs', () => {
            const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(null, null);
            expect(prospectNeeds).toBeNull();
        })

        test('test undefined inputs for prospect needs', () => {
            const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(undefined, undefined);
            expect(prospectNeeds).toBeNull();
        })
    })

    describe('test field mappings', () => {
        let lead = null;
        beforeEach(() => {
            lead = ObjectMappingService.createEmptyLead()
            lead.careType = 13
        })

        describe('test memory concerns mapping', () => {

            test('test set dementia to true', () => {
                // dementia - true, others - false
                lead.memoryConcerns.dementia = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.alzDiagnosis).toBeTruthy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test memory loss to true', () => {
                // memory loss - true, others - false
                lead.memoryConcerns.memoryLoss = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeTruthy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test forgets to true', () => {
                // regularly forgets things = true, others - false
                lead.memoryConcerns.repeatsStories = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeTruthy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test wandering to true', () => {
                // regularly forgets things = true, others - false
                lead.memoryConcerns.wandering = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeTruthy()
            })
        })

        describe('test mobility concerns mapping', () => {

            test('test fall risk to true', () => {
                lead.mobilityConcerns.fallRisk = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeTruthy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })

            test('test regular walks to true', () => {
                lead.mobilityConcerns.regularlyWalks = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeTruthy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()

            })

            test('test person transfer to true', () => {
                lead.mobilityConcerns.personTransfer = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeTruthy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })

            test('test uses wheel chair to true', () => {
                lead.mobilityConcerns.usesWheelChair = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeTruthy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })

            test('test 2nd person transfer to true', () => {
                lead.mobilityConcerns.secondPersonTransfer = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeTruthy()
            })

            test('test uses cane to true', () => {
                lead.mobilityConcerns.usesCane = true

                const user = TestUtils.createEmptyUser();
                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeTruthy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })
        })

    })
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