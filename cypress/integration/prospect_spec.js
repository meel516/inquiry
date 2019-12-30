/// <reference types="Cypress" />
import { login, setupDropdownMocks, replaceFetch, visitInquiryForm } from '../utils/befores';
import { getStringOfLength, fieldSelectors } from '../utils';
import phoneTypes from '../fixtures/phoneTypes';

const callingForOptions = [
    'Myself',
    'Parent',
    'Spouse',
    'Friend',
    'Other',
];

describe('Prospect Section', () => {
    before(() => {
        replaceFetch()
        login()
    })

    beforeEach(() => {
        cy.server()
        setupDropdownMocks()
        visitInquiryForm()
    })

    it ('hides name, phone, and email fields when callingFor = "Myself"', () => {
        const { lead: { callingFor, prospect }} = fieldSelectors;
        const fieldsToRemove = [
            prospect.firstName,
            prospect.lastName,
            prospect.phone.number,
            prospect.phone.type,
            prospect.email,
        ];

        callingForOptions.forEach(option => {
            const check = option === 'Myself' ? 'not.exist' : 'exist';
            cy.get(callingFor).select(option).blur()
            cy.get('[name^="lead.prospect."]').then(() => {
                fieldsToRemove.forEach(field => {
                    cy.get(field).should(check)
                })
            })
        })
    })

    it ('makes the prospect first and last name required only when callingFor = "Myself"', () => {
        const { lead: { callingFor, prospect: { firstName, lastName }}} = fieldSelectors;

        callingForOptions.filter(q => q !== 'Myself').forEach(option => {
            cy.get(callingFor).select(option)
            cy.get(firstName).focus().blur()
            cy.get('.alert.alert-danger').should('contain', 'First Name is required')
            cy.get(lastName).focus().blur()
            cy.get('.alert.alert-danger').should('contain', 'Last Name is required')
        })
    })

    it ('throws validation for first and last name values greater than 50 characters', () => {
        const { lead: { prospect: { firstName, lastName }}} = fieldSelectors;
        const firstNameErrorMessage = 'First Name can be at most 50 characters';
        const lastNameErrorMessage = 'Last Name can be at most 50 characters';

        cy.get(firstName).type(getStringOfLength(51), { delay: 1 }).blur()
        cy.get('.alert.alert-danger').should('contain', firstNameErrorMessage)
        cy.get(firstName).clear().blur()
        cy.get('.alert.alert-danger').should('not.contain', firstNameErrorMessage)

        cy.get(lastName).type(getStringOfLength(51), { delay: 1 }).blur()
        cy.get('.alert.alert-danger').should('contain', lastNameErrorMessage)
        cy.get(lastName).clear().blur()
        cy.get('.alert.alert-danger').should('not.contain', lastNameErrorMessage)
    })

    it ('throws validation when an email is not the correct format', () => {
        const { lead: { prospect: { email }}} = fieldSelectors;
        const emailErrorMessage = 'Email must be valid';

        cy.get(email).type('notanemail.com').blur()
        cy.get('.alert.alert-danger').should('contain', emailErrorMessage)
        cy.get(email).clear().type('goodemail@gmail.com').blur()
        cy.get('.alert.alert-danger').should('not.contain', emailErrorMessage)
    })

    it ('throws validation when an email is greater than 100 characters', () => {
        const { lead: { prospect: { email }}} = fieldSelectors;
        const emailErrorMessage = 'Email can be at most 100 characters';

        cy.get(email)
            .type(`${getStringOfLength(92)}@test.com`, { delay: 1 })
            .blur()
        cy.get('.alert.alert-danger').should('contain', emailErrorMessage)
        cy.get(email).type('{backspace}').blur()
        cy.get('.alert.alert-danger').should('not.contain', emailErrorMessage)
    })

    it ('throws validaiton when an age has more than 3 digits', () => {
        const { lead: { prospect: { age }}} = fieldSelectors;
        const ageErrorMessage = 'Age can be at most 3 digits';

        cy.get(age).type(4444).blur()
        cy.get('.alert.alert-danger').should('contain', ageErrorMessage)
        cy.get(age).type('{backspace}').blur()
        cy.get('.alert.alert-danger').should('not.contain', ageErrorMessage)
    })

    it ('throws required validation when phone number has a value but phone type does not', () => {
        const { lead: { prospect: { phone: { type, number }}}} = fieldSelectors;
        const errorMessage = 'Phone Type is required when Phone is entered';

        cy.get(number).type('5555555555')
        cy.get(type).focus().blur()
        cy.get('.alert.alert-danger').should('contain', errorMessage)
    })

    it ('throws validation when phone type has a value a value but phone number does not', () => {
        const { lead: { prospect: { phone: { type, number }}}} = fieldSelectors;
        const errorMessage = 'Phone is required when Phone Type is entered';

        cy.get(type).select(phoneTypes[0].text)
        cy.get(number).focus().blur()
        cy.get('.alert.alert-danger').should('contain', errorMessage)
    })

    it ('throws validation when phone number is in an incorrect format', () => {
        const { lead: { prospect: { phone: { number }}}} = fieldSelectors;
        const errorMessage = 'Phone is not Valid';

        cy.get(number).type('5555').blur()
        cy.get('.alert.alert-danger').should('contain', errorMessage)
    })
})