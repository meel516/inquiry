import React from 'react';

import {TestUtils} from './test-utils'
import {ObjectMappingService} from '../Types'
import { DropDownService, DuplicationService, SalesAPIService } from '../SalesServices';

describe('testing api', () => {
    beforeEach(() => {
      fetch.resetMocks()
    })

    test('fetch')
})

test('test empty contact if duplicate should be run - no', () => {
    const contact = ObjectMappingService.createEmptyContact();
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
});

test('test first name only dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    TestUtils.addFirstName(contact)
    expect(contact.firstName).toEqual('James')
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
})

test('test last name only dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    TestUtils.addLastName(contact)
    expect(contact.lastName).toEqual('Dune')
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
})

test('test phone only no dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    TestUtils.addPhoneNumber(contact)
    expect(contact.phone.number).toEqual('(234) 345-8374')
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
})

test('test first/last name no dup check', () => {
    const contact = ObjectMappingService.createEmptyContact()
    TestUtils.addFirstName(contact)
    TestUtils.verifyFirstName(contact);
    TestUtils.addLastName(contact)
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
})

test('test first/last phone but no phone type, dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    TestUtils.verifyFirstName(TestUtils.addFirstName(contact))
    TestUtils.verifyLastName(TestUtils.addLastName(contact))
    TestUtils.verifyPhoneNumber(TestUtils.addPhoneNumber(contact))
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy()
})

test('test dup check true with name/phone combo', () => {
    const contact = ObjectMappingService.createEmptyContact();
    TestUtils.verifyFirstName(TestUtils.addFirstName(contact))
    TestUtils.verifyLastName(TestUtils.addLastName(contact))
    TestUtils.verifyPhoneNumber(TestUtils.addPhoneNumber(contact))
    TestUtils.log(TestUtils.verifyPhoneType(TestUtils.addPhoneType(contact)))
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeTruthy()
})

test('test email no dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    TestUtils.verifyEmail(TestUtils.addEmailAddress(contact));
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy()
})

test('test dup check true with name/email combo', () => {
    const contact = ObjectMappingService.createEmptyContact();
    TestUtils.verifyEmail(TestUtils.addEmailAddress(contact));
    TestUtils.verifyFirstName(TestUtils.addFirstName(contact))
    TestUtils.verifyLastName(TestUtils.addLastName(contact))
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeTruthy()
})


