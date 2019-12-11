import service from './index'

describe('stripPhoneFormatting', () => {
    test('should remove non-digits', () => {
        expect(service('1234567890-=+_!@#$%^&&*()/?.,><;\'"[]{}`~abcdefghijklmnopqrstuvdxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual('1234567890')
    })
})