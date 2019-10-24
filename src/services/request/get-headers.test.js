import getHeaders from './get-headers'

describe('request.getHeaders Service', () => {
    test('should provide expected return', () => {
        const expected = {
            'Content-Type': 'application/json',
        }
        expect(getHeaders()).toEqual(expected)
    })
})