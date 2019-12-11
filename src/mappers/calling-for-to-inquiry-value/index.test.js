import callingForToInquiryValue from './index'

describe('callingForToInquiryValue Mapper', () => {
    test('should return PROSP for Myself', () => {
        expect(callingForToInquiryValue('Myself')) .toEqual('PROSP')
    })
    test('should return INFLU for default', () => {
        expect(callingForToInquiryValue('')) .toEqual('INFLU')
        expect(callingForToInquiryValue()) .toEqual('INFLU')
    })
})
