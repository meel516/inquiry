import mapMobilityConcernsToSales from './index'

describe('test mapping of mobility concerns to sales', () => {

    test('test empty object to mapper', () => {

        const mobilityConcernsMap = mapMobilityConcernsToSales({})
        expect(mobilityConcernsMap).toEqual({})
    })

    test('test mapping values', () => {
        const mobilityConcerns = {
            regularlyWalks: true,
            usesWheelChair: false,
            secondPersonTransfer: true,
        }
        const mobilityConcernsMap = mapMobilityConcernsToSales(mobilityConcerns);
        expect(mobilityConcernsMap).toEqual({ walkerRegularly: true, wheelchairRegularly: false, twoPersTransfer: true })
    })

})