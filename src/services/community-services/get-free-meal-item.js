import { find } from 'lodash'
import freeMealListings from '../../constants/free-meal-listings'

export default item => find(freeMealListings, { value: item }) || null
