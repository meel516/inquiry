import systemLinks from './index'

describe('system links', () => {
    test('should contain expected keys', () => {
        expect(systemLinks.length).toEqual(14)
    })
})