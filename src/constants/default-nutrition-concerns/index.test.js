import { defaultNutritionConcerns } from './index'

test('test default creation of nutrition concerns', () => {

    const nutritionConcerns = defaultNutritionConcerns;
    expect(nutritionConcerns).toEqual({ diabetes: false, lowSalt: false, prescribedDiet: false, notEatingWell: false })

})