import createMemoryConcerns from './create-memory-concerns'

describe('testing memory concerns mapping', () => {

    test('create memory concerns', () => {
        const memoryConcerns = createMemoryConcerns()
        expect(memoryConcerns).not.toBeNull()

        expect(memoryConcerns).toEqual({dementia: false, memoryLoss: false, repeatsStories: false, wandering: false})
    })

})