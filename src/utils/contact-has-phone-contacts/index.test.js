import contactHasPhoneContacts from './index'

describe('contactHasPhoneContacts', () => {
    it('should return truthy', () => {
        expect(contactHasPhoneContacts({ phone: { number: 'foo' } })).toBeTruthy()
        expect(contactHasPhoneContacts({ phone: { number: 1234 } })).toBeTruthy()
        expect(contactHasPhoneContacts({ phone: { number: [] } })).toBeTruthy()
        expect(contactHasPhoneContacts({ phone: { number: {} } })).toBeTruthy()
    })
    it('should return falsy', () => {
        expect(contactHasPhoneContacts({ phone: { number: '' } })).toBeFalsy()
        expect(contactHasPhoneContacts({ phone: {} })).toBeFalsy()
        expect(contactHasPhoneContacts({})).toBeFalsy()
        expect(contactHasPhoneContacts()).toBeFalsy()
    })
})
