import freeMealListings from './free-meal-listings'

describe('freeMealListings constant', () => {
    expect(freeMealListings).not.toBeNull()
    expect(freeMealListings.length).toEqual(4)
})