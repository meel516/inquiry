import addressMapper from './address-mapper'

describe('addressMapper utility', () => {
    test('should handle defaults', () => {
        expect(addressMapper()).toEqual({
            addressType: 'Home',
            active: true,
            primary: true,
            addressLine1: undefined,
            addressLine2: undefined,
            city: undefined,
            stateProv: undefined,
            zipPostalCode: undefined,
        })
    })
    test('should handle values', () => {
        const input = {
            address: {
                type: 'a',
                active: 'b',
                primary: 'c',
                line1: 'd',
                line2: 'e',
                city: 'f',
                state: 'g',
                zip: 'h',
            }
        }
        expect(addressMapper(input)).toEqual({
            addressType: 'a',
            active: 'b',
            primary: 'c',
            addressLine1: 'd',
            addressLine2: 'e',
            city: 'f',
            stateProv: 'g',
            zipPostalCode: 'h',
        })
    })
})
