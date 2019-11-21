import createProspectNeedsRequest from './index'
import { ObjectMappingService } from '../../services/Types'
import { TestUtils } from '../../utils/test-utils'

let lead = null;
const user = TestUtils.createEmptyUser();

describe('test create prospect needs request', () => {

    describe('test edge cases', () => {

        test('test null inputs for prospect needs', () => {
            const prospectNeeds = createProspectNeedsRequest(null, null, null);
            expect(prospectNeeds).toBeNull();
        })

        test('test undefined inputs for prospect needs', () => {
            const prospectNeeds = createProspectNeedsRequest(undefined, undefined, undefined);
            expect(prospectNeeds).toBeNull();
        })
    })

    describe('test field mappings', () => {
        beforeEach(() => {
            lead = ObjectMappingService.createEmptyLead()
            lead.careType = 13
        })

        describe('test memory concerns mapping', () => {

            test('test set dementia to true', () => {
                // dementia - true, others - false
                lead.memoryConcerns.dementia = true

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.alzDiagnosis).toBeTruthy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test memory loss to true', () => {
                // memory loss - true, others - false
                lead.memoryConcerns.memoryLoss = true

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeTruthy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test forgets to true', () => {
                // regularly forgets things = true, others - false
                lead.memoryConcerns.repeatsStories = true

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeTruthy()
                expect(prospectNeeds.wandering).toBeFalsy()
            })

            test('test wandering to true', () => {
                // regularly forgets things = true, others - false
                lead.memoryConcerns.wandering = true

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.alzDiagnosis).toBeFalsy()
                expect(prospectNeeds.argumentative).toBeFalsy()
                expect(prospectNeeds.forgetsRepeats).toBeFalsy()
                expect(prospectNeeds.wandering).toBeTruthy()
            })
        })

        describe('test mobility concerns mapping', () => {
            beforeEach(() => {
                lead = {
                    ...ObjectMappingService.createEmptyLead(),
                    careType: 13,
                }
            })
    
            test('test fall risk to true', () => {
                lead = {
                    ...lead,
                    mobilityConcerns: {
                        ...lead.mobilityConcerns,
                        fallRisk: true
                    }
                }

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeTruthy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })

            test('test regular walks to true', () => {
                lead = {
                    ...lead,
                    mobilityConcerns: {
                        ...lead.mobilityConcerns,
                        regularlyWalks: true
                    }
                }

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeTruthy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()

            })

            test('test person transfer to true', () => {
                lead.mobilityConcerns.personTransfer = true

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeTruthy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })

            test('test uses wheel chair to true', () => {
                lead.mobilityConcerns.usesWheelChair = true

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeTruthy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeFalsy()
            })

            test('test 2nd person transfer to true', () => {
                lead.mobilityConcerns.secondPersonTransfer = true

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
                expect(prospectNeeds.fallRisk).toBeFalsy()
                expect(prospectNeeds.walkerRegularly).toBeFalsy()
                expect(prospectNeeds.caneRegularly).toBeFalsy()
                expect(prospectNeeds.wheelchairRegularly).toBeFalsy()
                expect(prospectNeeds.onePersTransfer).toBeFalsy()
                expect(prospectNeeds.twoPersTransfer).toBeTruthy()
            })

            test('test uses cane to true', () => {
                lead.mobilityConcerns.usesCane = true

                const prospectNeeds = createProspectNeedsRequest(1, lead, user);
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
