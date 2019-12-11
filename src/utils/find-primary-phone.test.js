import getPrimaryPhone from './find-primary-phone'

describe('test fetch primary phone number', () => {
    test('find the primary phone number from list', () => {
        const phoneNumbers = [
            {
                "primary": false,
                "phoneNumber": "9043824444",
                "phoneType": "Work",
            },
            {
                "primary": true,
                "phoneNumber": "9043824445",
                "phoneType": "Work",
            }
        ]

        const phone = getPrimaryPhone(phoneNumbers)

        expect(phone).not.toBeNull()
        expect(phone).toEqual(phoneNumbers[1])
    })

    test('test supplied undefined', () => {
        const phone = getPrimaryPhone(undefined);
        expect(phone).toEqual(undefined);
    })

    test('test supplied empty array', () => {
        const phone = getPrimaryPhone([])
        expect(phone).toEqual(undefined)
    })

    test('test no primary phone number provided', () => {
        const phoneNumbers = [
            {
                "primary": false,
                "phoneNumber": "9043824444",
                "phoneType": "Work",
            },
            {
                "primary": false,
                "phoneNumber": "9043824445",
                "phoneType": "Work",
            }
        ]

        const phone = getPrimaryPhone(phoneNumbers)

        expect(phone).not.toBeNull()
        expect(phone).toEqual(phoneNumbers[0])
    })
})
