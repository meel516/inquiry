import createPhone from './index'
import stripPhoneFormatting from '../../utils/strip-phone-formatting'

jest.mock('../../utils/strip-phone-formatting')

describe('testing create phone object', () => {
    beforeEach(() => {
        stripPhoneFormatting.mockClear()
        stripPhoneFormatting.mockReturnValue('PHONE')
    })
    test('happy path phone creation', () => {
        const phone = {
            phome: '(414) 555-1212',
            type: 'HOME_PHONE_TYPE'
        }

        const conversion = createPhone(phone)
        expect(conversion).not.toBeNull()

        expect(conversion.primary).toBeTruthy()
        expect(conversion.phoneType).toEqual('HOME_PHONE_TYPE')
        expect(conversion.phoneNumber).toEqual('PHONE')
    })

    test('should handle default', () => {
        expect(createPhone()).toEqual({
            primary: true,
            phoneNumber: 'PHONE'
        })
    })

})