import service from './can-have-duplicates'
import { set } from 'lodash'

describe('canHaveDuplicates', () => {
    test('should return true if email is present', () => {
        expect(service(set({}, 'email', 'foo'))).toBeTruthy()
    })
    test('should return true if phone number is present', () => {
        expect(service(set({}, 'phone.number', 'foo'))).toBeTruthy()
    })
    test('should return false for invalid contact', () => {
        expect(service()).toBeFalsy()
    })
    test('should return false for empty contact', () => {
        expect(service({})).toBeFalsy()
    })
})
