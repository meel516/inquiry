import freeMealListings from './free-meal-listings'

describe('freeMealListings constant', () => {
    test('should be valid', () => {
        expect(freeMealListings).not.toBeNull()
        expect(freeMealListings.length).toEqual(4)
    })
    
})