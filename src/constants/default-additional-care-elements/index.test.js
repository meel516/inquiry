import additionalCareElements from './index'
import { keys } from 'lodash'

test('test additional elements list size', () => {
    expect(keys(additionalCareElements).length).toEqual(4)
})