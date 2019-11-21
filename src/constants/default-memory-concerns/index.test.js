import {defaultMemoryConcerns} from './index'

describe('testing memory concerns mapping', () => {

    test('create memory concerns', () => {
        expect(defaultMemoryConcerns).not.toBeNull()
        expect(defaultMemoryConcerns).toEqual({dementia: false, memoryLoss: false, repeatsStories: false, wandering: false})
    })

})