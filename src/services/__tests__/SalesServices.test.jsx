import React from 'react';

import {ObjectMappingService} from '../Types'
import { DropDownService, DuplicationService, SalesAPIService } from '../SalesServices';

function addFirstName(contact) {
    contact.firstName = 'James'
    return contact
}

function verifyFirstName(contact) {
    expect(contact.firstName).toEqual('James')
    return contact
}

function addLastName(contact) {
    contact.lastName = 'Dune'
    return contact
}

function verifyLastName(contact) {
    expect(contact.lastName).toEqual('Dune')
    return contact
}

function addPhoneNumber(contact) {
    contact.phone.number = '(234) 345-8374'
    return contact
}

function verifyPhoneNumber(contact) {
    expect(contact.phone.number).toEqual('(234) 345-8374')
    return contact
}

function addPhoneType(contact) {
    contact.phone.type = 'Home';
    return contact;
}

function verifyPhoneType(contact) {
    expect(contact.phone.type).toEqual('Home')
    return contact
}

function addEmailAddress(contact) {
    contact.email = 'james.dune@gmail.com'
    return contact
}

function verifyEmail(contact) {
    expect(contact.email).toEqual('james.dune@gmail.com')
    return contact
}

function log(o) {
    console.log(JSON.stringify(o));
}

test('test empty contact if duplicate should be run - no', () => {
    const contact = ObjectMappingService.createEmptyContact();
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
});

test('test first name only dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    addFirstName(contact)
    expect(contact.firstName).toEqual('James')
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
})

test('test last name only dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    addLastName(contact)
    expect(contact.lastName).toEqual('Dune')
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
})

test('test phone only no dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    addPhoneNumber(contact)
    expect(contact.phone.number).toEqual('(234) 345-8374')
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
})

test('test first/last name no dup check', () => {
    const contact = ObjectMappingService.createEmptyContact()
    addFirstName(contact)
    verifyFirstName(contact);
    addLastName(contact)
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
})

test('test first/last phone but no phone type, dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    verifyFirstName(addFirstName(contact))
    verifyLastName(addLastName(contact))
    verifyPhoneNumber(addPhoneNumber(contact))
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy()
})

test('test dup check true with name/phone combo', () => {
    const contact = ObjectMappingService.createEmptyContact();
    verifyFirstName(addFirstName(contact))
    verifyLastName(addLastName(contact))
    verifyPhoneNumber(addPhoneNumber(contact))
    log(verifyPhoneType(addPhoneType(contact)))
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeTruthy()
})

test('test email no dup check', () => {
    const contact = ObjectMappingService.createEmptyContact();
    verifyEmail(addEmailAddress(contact));
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy()
})

test('test dup check true with name/email combo', () => {
    const contact = ObjectMappingService.createEmptyContact();
    verifyEmail(addEmailAddress(contact));
    verifyFirstName(addFirstName(contact))
    verifyLastName(addLastName(contact))
    expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeTruthy()
})


