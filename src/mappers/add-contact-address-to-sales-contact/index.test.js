import addContactAddressToSalesContact from './index'
import contactHasAddress from '../../utils/contact-has-address'
import addressMapper from './address-mapper'

jest.mock('../../utils/contact-has-address')
jest.mock('./address-mapper')

describe('addContactAddressToSalesContact utility', () => {
    beforeEach(() => {
        contactHasAddress.mockClear()
        addressMapper.mockClear()
    })
    test('should handle defaults', () => {
        expect(addContactAddressToSalesContact()).toEqual({})
    })
    test('should handle existing', () => {
        expect(addContactAddressToSalesContact({ foo: 'bar' })).toEqual({ foo: 'bar' })
    })
    test('should map contact', () => {
        contactHasAddress.mockReturnValue(true)
        addressMapper.mockReturnValue('ADDRESS')
        expect(addContactAddressToSalesContact().address).toEqual('ADDRESS')
    })
})
