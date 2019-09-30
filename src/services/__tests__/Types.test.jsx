
import { TestUtils } from '../../utils/test-utils'
import { ObjectMappingService, Util as Utils } from "../Types"

test('test phone number digits only', () => {
    expect(Utils.stripPhoneFormatting('(414) 404-3453')).toEqual('4144043453')
})

test('verify creation of phone structure', () => {
    expect(ObjectMappingService.createEmptyPhone()).toEqual({ number: "", type: "" })
})

test('verify contact does not have address', () => {
    const contact = ObjectMappingService.createEmptyContact();
    expect(Utils.hasAddress(contact)).toBeFalsy()
})

test('verify contact does have address', () => {
    const contact = ObjectMappingService.createEmptyContact();
    contact.address = ObjectMappingService.createEmptyAddress();
    expect(Utils.hasAddress(contact)).toBeTruthy();
})

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

test('test address is not valid', () => {
    expect(Utils.isAddressEmpty(null)).toBeFalsy();
})

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
    
                let prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.alzDiagnosis).toBeTruthy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test memory loss to true', () => {
                // memory loss - true, others - false
                lead.memoryConcerns.memoryLoss = true

                let prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeTruthy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test forgets to true', () => {
                // regularly forgets things = true, others - false
                lead.memoryConcerns.repeatsStories = true

                let prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeTruthy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test wandering to true', () => {
                // regularly forgets things = true, others - false
                lead.memoryConcerns.wandering = true

                let prospectNeeds = ObjectMappingService.createProspectNeedsRequest(1, lead);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeTruthy()
            })
        })

        describe('test mobility concerns mapping', () => {
            test('test fall risk to true', () => {
                lead.mobilityConcerns.fallRisk = true

            })

            test('test regular walks to true', () => {
                lead.mobilityConcerns.regularlyWalks = true

            })

            test('test person transfer to true', () => {
                lead.mobilityConcerns.personTransfer = true

            })

            test('test uses wheel chair to true', () => {
                lead.mobilityConcerns.usesWheelChair = true

            })

            test('test 2nd person transfer to true', () => {
                lead.mobilityConcerns.secondPersonTransfer = true
            })

            test('test uses cane to true', () => {
                lead.mobilityConcerns.usesCane = true
            })
        })

    })
})