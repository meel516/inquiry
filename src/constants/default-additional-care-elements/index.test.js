import * as additionalCareElements from './index'
import { keys } from 'lodash'
describe('defaultAdditionalCareElements Constant', () => {
    test('should export expected size', () => {
        expect(keys(additionalCareElements).length).toEqual(5)
    })
    test('should contain expected exports', () => {
        expect(additionalCareElements.MEMORY_CONCERNS).toEqual(1)
        expect(additionalCareElements.MOBILITY_CONCERNS).toEqual(2)
        expect(additionalCareElements.NUTRITION_CONCERNS).toEqual(3)
        expect(additionalCareElements.CURRENT_LIVING_SITUATION).toEqual(4)
    })
    test('should export additionalCareElements of proper size', () => {
        expect(additionalCareElements.additionalCareElements.length).toEqual(4)
    })
})
