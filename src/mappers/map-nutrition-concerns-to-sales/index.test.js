import mapNutritionConcernsToSales from './index'

describe('test mapping nutrition concerns to sales', () => {

    test('mapping empty object', () => {

        const nutritionConcernsMap = mapNutritionConcernsToSales({})
        expect(nutritionConcernsMap).toEqual({})
    })

    test('mapping lowsalt values to nutrition concerns', () => {

        const nutritionConcerns = mapNutritionConcernsToSales({ lowSalt: false })
        expect(nutritionConcerns).toEqual({ lowSaltLowDiet: false })
    })
})