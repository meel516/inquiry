
import { TestUtils } from './test-utils'
import { ObjectMappingService, Util as Utils } from "../Types"

test('test phone number digits only', () => {
    expect(Utils.stripPhoneFormatting('(414) 404-3453')).toEqual('4144043453')
})

test('verify creation of phone structure', () => {
    expect(ObjectMappingService.createEmptyPhone()).toEqual({ number: "", type: "" })
})

test('verify contact does not have address', () => {
    const contact = ObjectMappingService.createEmptyContact();
    expect(Utils.hasAddress(contact)).toBeFalsy()
})

test('verify contact does have address', () => {
    const contact = ObjectMappingService.createEmptyContact();
    contact.address = ObjectMappingService.createEmptyAddress();
    expect(Utils.hasAddress(contact)).toBeTruthy();
})

test('test Caller is calling for "MySelf" which is mapped to Prospect', () => {
    const callingFor = "Myself";
    expect(Utils.mapInquiryTypeValue(callingFor)).toBe('PROSP');
})

test('test Caller is not mapped to "MySelf" which is mapped to Influencer', () => {
    const callingFor = '';
    expect(Utils.mapInquiryTypeValue(callingFor)).toBe('INFLU')
})

test('test option not selected for Caller which defaults to Influencer', () => {
    expect(Utils.mapInquiryTypeValue(null)).toBe('INFLU')
    expect(Utils.mapInquiryTypeValue(undefined)).toBe('INFLU')
    expect(Utils.mapInquiryTypeValue('')).toBe('INFLU')
})

test('test address is not valid', () => {
    expect(Utils.isAddressEmpty(null)).toBeFalsy();
})

test('test contact is empty', () => {
    expect(Utils.isContactEmpty(null)).toBeTruthy();
})

test('test undefined contact is empty', () => {
    expect(Utils.isContactEmpty(undefined)).toBeTruthy()
})

test('test empty contact still empty', () => {
    const contact = ObjectMappingService.createEmptyContact();
    expect(Utils.isContactEmpty(contact)).toBeTruthy()
})

test('test first name only still empty', () => {
    const contact = ObjectMappingService.createEmptyContact();
    TestUtils.addFirstName(contact)
    expect(Utils.isContactEmpty(contact)).toBeTruthy() 
})