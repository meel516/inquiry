import addContactPhoneToSalesContact from './index'
import contactHasPhoneContacts from '../../utils/contact-has-phone-contacts'
import createPhone from './create-phone'

jest.mock('../../utils/contact-has-phone-contacts')
jest.mock('./create-phone')

describe('addContactPhoneToSalesContact Utility', () => {
    beforeEach(() => {
        contactHasPhoneContacts.mockClear()
        createPhone.mockClear()
    })
    test('should handle defaults', () => {
        expect(addContactPhoneToSalesContact()).toEqual({})
    })
    test('should handle existing', () => {
        expect(addContactPhoneToSalesContact({ foo: 'bar' })).toEqual({ foo: 'bar' })
    })
    test('should handle contact', () => {
        contactHasPhoneContacts.mockReturnValue(true)
        createPhone.mockReturnValue('PHONE')
        expect(addContactPhoneToSalesContact()).toEqual({ phoneNumbers: [ 'PHONE' ] })
    })
})
