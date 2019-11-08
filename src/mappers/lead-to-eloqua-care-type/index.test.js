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
        expect(mapper({ careType: 'careType', currentSituation: 'currentSituation' })).toEqual({ careType: 'careType', currentSituation: 'currentSituation' })
    })
})
