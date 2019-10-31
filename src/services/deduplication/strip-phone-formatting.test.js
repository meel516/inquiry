import service from './strip-phone-formatting'

describe('salesServices.stripPhoneFormatting', () => {
    test('should remove non-digits', () => {
        expect(service('1234567890-=+_!@#$%^&&*()/?.,><;\'"[]{}`~abcdefghijklmnopqrstuvdxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual('1234567890')
    })
})