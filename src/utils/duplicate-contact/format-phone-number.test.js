import formatPhoneNumber from './format-phone-number'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

jest.mock('libphonenumber-js', () => ({ parsePhoneNumberFromString: jest.fn() }))

describe('duplicateContact.formatPhoneNumber utility', () => {
    beforeEach(() => {
        parsePhoneNumberFromString.mockClear()
        parsePhoneNumberFromString.mockReturnValue({ formatNational: () => 'RESULT' })
    })
    test('should call dependency properly', () => {
        formatPhoneNumber('INPUT')
        expect(parsePhoneNumberFromString).toHaveBeenCalledWith(`+1INPUT`)
    })
    test('should return properly for valid input', () => {
        expect(formatPhoneNumber('INPUT')).toEqual('RESULT')
    })
    test('should return properly for invalid input', () => {
        expect(formatPhoneNumber()).toBeFalsy()
    })
})
