import getFreeMealItem from './get-free-meal-item'
import freeMealListings from '../../constants/free-meal-listings'
import { find } from 'lodash'

jest.mock('../../constants/free-meal-listings', () => [])
jest.mock('lodash', () => ({ find: jest.fn() }))

describe('communityServices.getFreeMealItem Service', () => {
    test('should properly call find', () => {
        getFreeMealItem('')
        expect(find).toHaveBeenCalled()
    })
})