import createPhone from './index'

describe('testing create phone object', () => {

    test('happy path phone creation', () => {
        const phone = {
            phome: '(414) 555-1212',
            type: 'HOME_PHONE_TYPE'
        }

        const conversion = createPhone(phone)
        expect(conversion).not.toBeNull()

        expect(conversion.primary).toBeTruthy()
        expect(conversion.phoneType).toEqual('HOME_PHONE_TYPE')
        expect(conversion.phoneNumber).toEqual(4145551212)
    })

    test('test undefined phone createion', () => {
        const phone = undefined

        const conversion = createPhone(phone)
        expect(conversion).toBeNull()
    })

})