import uuid from 'uuid/v4'
import createCommunity from './create-community'

jest.mock('uuid/v4')

describe('communityServices.createCommunity Service', () => {
    beforeEach(() => {
        uuid.mockClear()
    })
    test('should return valid for provided id', () => {
        const expected = {
            uuid: '12345',
            communityId: 0,
            freeMeal: null,
            followUpDate: null
        }
        expect(createCommunity(expected.uuid)).toEqual(expected)
    })
    test('should auto assign id for none provided', () => {
        uuid.mockReturnValue('foo')
        const expected = {
            uuid: 'foo',
            communityId: 0,
            freeMeal: null,
            followUpDate: null
        }
        expect(createCommunity()).toEqual(expected)
    })
})