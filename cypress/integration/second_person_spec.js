/// <reference types="Cypress" />
import { login, mockAllApiCalls, replaceFetch, visitInquiryForm } from '../utils/befores';
import { getStringOfLength, fields, fieldSelectors } from '../utils';
import phoneTypes from '../fixtures/phoneTypes';

describe('Second Person Section', () => {
    before(() => {
        replaceFetch()
        login()
    })

    beforeEach(() => {
        cy.server()
        mockAllApiCalls()
        visitInquiryForm()
    })

    it ('hides second person fields when not selected', () => {
        const { lead: { secondPerson }} = fields;
        const secondPersonFieldsToShow = [
            secondPerson.selected,
            secondPerson.firstName,
            secondPerson.lastName,
            secondPerson.phone.number,
            secondPerson.phone.type,
            secondPerson.email,
            fields.lead.notes.secondPersonNote,
        ]

        cy.get('[name^="lead.secondPerson"]').then(elements => {
            assert.equal(elements.length, 1)
            assert.equal(elements[0].name, fields.lead.secondPerson.selected)
        })

        cy.get(fieldSelectors.lead.secondPerson.selected).check()
        
        cy.get('[name^="lead.secondPerson"], [name="lead.notes.secondPersonNote"]').then(elements => {
            assert.equal(elements.length, secondPersonFieldsToShow.length)
            elements.each((_i, elem) => {
                cy.wrap(secondPersonFieldsToShow).should('contain', elem.name)
            })
        })
    })

    it ('throws validation for first and last name values greater than 50 characters', () => {
        const { lead: { secondPerson: { firstName, lastName, selected }}} = fieldSelectors;
        const firstNameErrorMessage = 'First Name can be at most 50 characters';
        const lastNameErrorMessage = 'Last Name can be at most 50 characters';

        cy.get(selected).check()

        cy.get(firstName).type(getStringOfLength(51), { delay: 1 }).blur()
        cy.get('.alert.alert-danger').should('contain', firstNameErrorMessage)
        cy.get(firstName).clear().blur()
        cy.get('.alert.alert-danger').should('not.contain', firstNameErrorMessage)

        cy.get(lastName).type(getStringOfLength(51), { delay: 1 }).blur()
        cy.get('.alert.alert-danger').should('contain', lastNameErrorMessage)
        cy.get(lastName).clear().blur()
        cy.get('.alert.alert-danger').should('not.contain', lastNameErrorMessage)
    })

    it ('throws required validation when phone number has a value but phone type does not', () => {
        const { lead: { secondPerson: { selected, phone: { type, number }}}} = fieldSelectors;
        const errorMessage = 'Phone Type is required when Phone is entered';

        cy.get(selected).check()

        cy.get(number).type('5555555555').blur()
        cy.get(type).focus().blur()
        cy.get('.alert.alert-danger').should('contain', errorMessage)
    })

    it ('throws validation when phone type has a value a value but phone number does not', () => {
        const { lead: { secondPerson: { selected, phone: { type, number }}}} = fieldSelectors;
        const errorMessage = 'Phone is required when Phone Type is entered';

        cy.get(selected).check()

        cy.get(type).select(phoneTypes[0].text)
        cy.get(number).focus().blur()
        cy.get('.alert.alert-danger').should('contain', errorMessage)
    })

    it ('throws validation when phone number is in an incorrect format', () => {
        const { lead: { secondPerson: { selected, phone: { number }}}} = fieldSelectors;
        const errorMessage = 'Phone is not Valid';

        cy.get(selected).check()

        cy.get(number).type('5555').blur()
        cy.get('.alert.alert-danger').should('contain', errorMessage)
    })

    it ('throws validation when an email is not the correct format', () => {
        const { lead: { secondPerson: { selected, email }}} = fieldSelectors;
        const emailErrorMessage = 'Email must be valid';

        cy.get(selected).check()

        cy.get(email).type('notanemail.com').blur()
        cy.get('.alert.alert-danger').should('contain', emailErrorMessage)
        cy.get(email).clear().type('goodemail@gmail.com').blur()
        cy.get('.alert.alert-danger').should('not.contain', emailErrorMessage)
    })

    it ('throws validation when an email is greater than 100 characters', () => {
        const { lead: { secondPerson: { selected, email }}} = fieldSelectors;
        const emailErrorMessage = 'Email can be at most 100 characters';

        cy.get(selected).check()
        cy.get(email)
            .type(`${getStringOfLength(92)}@test.com`, { delay: 1 })
            .blur()
        cy.get('.alert.alert-danger').should('contain', emailErrorMessage)
        cy.get(email).type('{backspace}').blur()
        cy.get('.alert.alert-danger').should('not.contain', emailErrorMessage)
    })
})