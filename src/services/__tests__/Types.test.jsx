
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

describe('calling for tests', () => {

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
        const contact = ObjectMappingService.createInfluencer(undefined)
        expect(contact.influencerId).toBeUndefined()

        expect(contact.firstName).toEqual('')
        expect(contact.lastName).toEqual('')
    })

    test('test valid influencer (salesContact) mapping ', () => {
        const influencer = {
            influencerId: 1234567,
            salesContact: {
                contactId: 3456789,
                masterId: 7867232,
                firstName: 'Justin',
                lastName: 'James',
                age: 87,
                address: {
                    addressId: 3423132,
                    addressType: 'HOME',
                    primary: true,
                    active: true,
                },
                phoneNumbers: [
                    {
                        onNationalDoNotCall: false,
                        primary: true,
                        phoneNumber: "4148977894",
                        phoneType: "Home",
                        phoneId: 12083324
                    }
                ]
            }
        }
        const contact = ObjectMappingService.createInfluencer(influencer);

        expect(contact.influencerId).toEqual(influencer.influencerId)
        expect(contact.contactId).toEqual(influencer.salesContact.contactId)
        expect(contact.address.addressId).toEqual(influencer.salesContact.address.addressId)
    })
})

describe('test prospect creation', () => {

    test('create prospect request via undefined prospect', () => {
        const prospect = ObjectMappingService.createProspectRequest(undefined);
        expect(prospect).not.toBeNull();
        
    })
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

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.alzDiagnosis).toBeTruthy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test memory loss to true', () => {
                // memory loss - true, others - false
                lead.memoryConcerns.memoryLoss = true

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeTruthy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test forgets to true', () => {
                // regularly forgets things = true, others - false
                lead.memoryConcerns.repeatsStories = true

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeTruthy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test wandering to true', () => {
                // regularly forgets things = true, others - false
                lead.memoryConcerns.wandering = true

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeTruthy()
            })
        })

        describe('test mobility concerns mapping', () => {

            test('test fall risk to true', () => {
                lead.mobilityConcerns.fallRisk = true

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.fallRisk).toBeTruthy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })

            test('test regular walks to true', () => {
                lead.mobilityConcerns.regularlyWalks = true

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeTruthy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()

            })

            test('test person transfer to true', () => {
                lead.mobilityConcerns.personTransfer = true

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeTruthy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })

            test('test uses wheel chair to true', () => {
                lead.mobilityConcerns.usesWheelChair = true

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeTruthy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })

            test('test 2nd person transfer to true', () => {
                lead.mobilityConcerns.secondPersonTransfer = true

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeTruthy()
            })

            test('test uses cane to true', () => {
                lead.mobilityConcerns.usesCane = true

                const prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
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