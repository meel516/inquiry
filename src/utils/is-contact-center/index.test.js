import isContactCenter from './index'

describe('verify is contact center logic', () => {

    test('is contact center edge case with null', () => {
        const result = isContactCenter(null)
        expect(result).toBeFalsy()
    })

    test('is contact center edge case with undefined', () => {
        const result = isContactCenter(undefined)
        expect(result).toBeFalsy()
    })

    test('is contact center and supplied non contact center id', () => {
        const result = isContactCenter(5)
        expect(result).toBeFalsy()
    })

    test('is contact center and is contact center', () => {
        const result = isContactCenter(225707)
        expect(result).toBeTruthy()
    })
})