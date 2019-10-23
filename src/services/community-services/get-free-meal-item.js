import getFreeMealListing from './get-free-meal-listing'
import { find } from 'lodash'

export default item => find(getFreeMealListing(), { value: item }) || null
