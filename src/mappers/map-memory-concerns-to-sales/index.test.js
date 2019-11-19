import mapMemoryConcernsToSales from './index'

describe('map memory concerns to sales', () => {

    test('map empty memory concerns', () => {

        const memoryConcerns = {}

        const memoryConernsMap = mapMemoryConcernsToSales(memoryConcerns)

        expect(memoryConernsMap).toEqual({})
    })

    test('map memory concerns', () => {
        const memoryConcerns = {
            dementia: true,
            memoryLoss: true,
            repeatsStories: true,
            wandering: true,
        }

        const memoryConcernsMap = mapMemoryConcernsToSales(memoryConcerns)
        expect(memoryConcernsMap).toEqual({alzDiagnosis: true, argumentative: true, forgetsRepeats: true, wandering: true})
    })
})