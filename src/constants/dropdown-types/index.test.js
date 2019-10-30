import dropdownTypes from './index'
import { keys } from 'lodash'

describe('dropdownTypes', () => {
    test('should contain expected keys', () => {
        expect(keys(dropdownTypes).length).toEqual(10)
    })
})