import contactHasAddress from './index'

describe('contactHasAddress', () => {
    it('should return truthy', () => {
        expect(contactHasAddress({ address: 'foo' })).toBeTruthy()
        expect(contactHasAddress({ address: 1234 })).toBeTruthy()
        expect(contactHasAddress({ address: [] })).toBeTruthy()
        expect(contactHasAddress({ address: {} })).toBeTruthy()
    })
    it('should return falsy', () => {
        expect(contactHasAddress({ address: '' })).toBeFalsy()
        expect(contactHasAddress({})).toBeFalsy()
        expect(contactHasAddress()).toBeFalsy()
    })
})
