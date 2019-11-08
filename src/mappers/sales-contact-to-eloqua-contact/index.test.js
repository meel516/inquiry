import mapper from './index'

describe('salesContactToEloquaContact mapper', () => {
    describe('should handle default', () => {
        expect(mapper()).toEqual({})
    })
    describe('should handle additional values', () => {
        expect(mapper({}, { foo: 'bar' })).toEqual({ foo: 'bar' })
    })
})
