import findPrimaryPhone from './find-primary-phone'

describe('duplicateContact.findPrimaryPhone utility', () => {
    test('should return properly for default', () => {
        expect(findPrimaryPhone()).toBeFalsy()
        expect(findPrimaryPhone({})).toBeFalsy()
        expect(findPrimaryPhone({ phoneNumbers: [] })).toBeFalsy()
    })
    test('should return properly for non primary', () => {
        expect(findPrimaryPhone({ phoneNumbers: [ { primary: false } ] })).toBeFalsy()
    })
    test('should return properly for falsy primary', () => {
        expect(findPrimaryPhone({ phoneNumbers: [ { primary: true } ] })).toBeFalsy()
    })
    test('should return properly valid last primary', () => {
        expect(findPrimaryPhone({ phoneNumbers: [ { primary: true, phoneNumber: 'FOO' }, { primary: true, phoneNumber: 'BAR' } ] }))
            .toEqual({ primary: true, phoneNumber: 'BAR' })
    })
})
