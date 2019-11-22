import createPhone from './create-phone'
import stripPhoneFormatting from '../../utils/strip-phone-formatting'

jest.mock('../../utils/strip-phone-formatting')

describe('createPhone utility', () => {
    beforeEach(() => {
        stripPhoneFormatting.mockClear()
    })
    test('should handle default', () => {
        expect(createPhone()).toEqual({
            primary: true,
            phoneNumber: undefined,
            phoneType: undefined,
            phoneId: undefined
        })
    })
    test('should handle values', () => {
        stripPhoneFormatting.mockReturnValue('STRIPPED_PHONE')
        const input = {
            type: 'a',
            phoneId: 'b'
        }
        expect(createPhone(input)).toEqual({
            primary: true,
            phoneNumber: 'STRIPPED_PHONE',
            phoneType: 'a',
            phoneId: 'b'
        })
    })
})
