import duplicateContact from './index'
import findPrimaryPhone from './find-primary-phone'
import formatPhoneNumber from './format-phone-number'

jest.mock('./find-primary-phone')
jest.mock('./format-phone-number')

describe('duplicateContact utility', () => {
    beforeEach(() => {
        findPrimaryPhone.mockClear()
        formatPhoneNumber.mockClear()
    })
    test('should respond properly', () => {
        findPrimaryPhone.mockReturnValue({ phoneType: 'J' })
        formatPhoneNumber.mockReturnValue('K')
        const input = {
            contactId: 'A',
            firstName: 'B',
            lastName: 'C',
            address: {
                addressLine1: 'D',
                addressLine2: 'E',
                city: 'F',
                stateProv: 'G',
                zipPostalCode: 'H',
            },
            emailAddress: 'I',
        }
        const expected = {
            contactid: 'A',
            name: `B C`,
            address1: 'D',
            address2: 'E',
            city: 'F',
            state: 'G',
            zip: 'H',
            email: 'I',
            phoneType: 'J',
            phone: 'K'
        }
        expect(duplicateContact(input)).toEqual(expected)
    })
})