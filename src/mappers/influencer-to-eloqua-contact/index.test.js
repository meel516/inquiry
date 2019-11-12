import mapper from './index'
import salesContactToEloquaContact from '../sales-contact-to-eloqua-contact'

jest.mock('../sales-contact-to-eloqua-contact')

describe('influencerToEloquaContact mapper', () => {
    beforeEach(() => {
        salesContactToEloquaContact.mockClear()
        salesContactToEloquaContact.mockReturnValue('CONTACT')
    })
    test('should handle default', () => {
        expect(mapper()).toEqual({})
    })
    test('should handle valid data', () => {
        expect(mapper({})).toEqual({ salesContact: 'CONTACT' })
    })
})
