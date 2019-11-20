import mapAdlNeedsToSales from './index'

describe('test adl needs mapping to sales', () => {

    test('test empty request to adl needs mapper', () => {

        const aldNeedsMap = mapAdlNeedsToSales({})
        expect(aldNeedsMap).toEqual({})

    })

})