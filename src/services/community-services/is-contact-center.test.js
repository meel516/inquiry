import isContactCenter from './is-contact-center'

describe('communityServices.isContactCenter Service', () => {
    test('should return false for non-contactCenter', () => {
        expect(isContactCenter()).toBeFalsy()
        expect(isContactCenter({})).toBeFalsy()
    })
    test('should return true for contactCenter', () => {
        expect(isContactCenter({ buildingId: 225707 })).toBeTruthy()
    })
})