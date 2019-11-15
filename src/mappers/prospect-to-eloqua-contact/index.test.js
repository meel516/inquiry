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
            reasonForCall: 'a',
            inquiryType: 'b',
            leadSource: 'c',
            leadSourceDetail: 'd',
            leadSourceSubDetail: 'e'
        }
        const expected = {
            salesContact: 'CONTACT',
            interestReasonId: 'a',
            inquiryTypeId: 'b',
            inquiryLeadSourceId: 'c',
            inquiryLeadSourceDetailId: 'd',
            inquiryLeadSourceSubDetailId: 'e'
        }
        expect(mapper(input)).toEqual(expected)
    })
})
