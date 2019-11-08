import mapper from './index'
import { get } from 'lodash'

jest.mock('lodash', () => ({ get: jest.fn() }))

describe('leadToEloquaCareType mapper', () => {
    beforeEach(() => {
        get.mockClear()
    })
    test('should handle default', () => {
        expect(mapper()).toEqual({})
    })
    test('should handle valid data', () => {
        const response = mapper({ careType: 'careType', currentSituation: 'currentSituation' })
        expect(response.careTypeId).toEqual('careType')
        expect(response.currentSituationId).toEqual('currentSituation')
    })
})
