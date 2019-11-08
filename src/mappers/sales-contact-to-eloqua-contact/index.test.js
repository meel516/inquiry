import mapper from './index'

describe('salesContactToEloquaContact mapper', () => {
    test('should handle default', () => {
        expect(mapper()).toEqual({})
    })
    test('should handle additional values', () => {
        expect(mapper({}, { foo: 'bar' })).toEqual({ foo: 'bar' })
    })
})
