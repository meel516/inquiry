import mapper from './index'
import salesContactToEloquaContact from '../sales-contact-to-eloqua-contact'

jest.mock('../sales-contact-to-eloqua-contact')

describe('prospectToEloquaContact mapper', () => {
    beforeEach(() => {
        salesContactToEloquaContact.mockClear()
        salesContactToEloquaContact.mockReturnValue('CONTACT')
    })    
    test('should handle default', () => {
        expect(mapper()).toEqual({})
    })
    test('should handle valid data', () => {
        const input = {
            selected: 'a'
        }
        const expected = {
            salesLead: {
                salesContact: 'CONTACT'
            }
        }
        expect(mapper(input)).toEqual(expected)
    })
})