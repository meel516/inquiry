/// <reference types="Cypress" />
import { login, mockAllApiCalls, replaceFetch, visitInquiryForm } from '../utils/befores';
import { getStringOfLength, fieldSelectors } from '../utils';
import { duplicateModal } from '../utils/elements';
import phoneTypes from '../fixtures/phoneTypes';

describe('Influencer Section', () => {
    before(() => {
        replaceFetch()
        login()
    })

    beforeEach(() => {
        cy.server()
        mockAllApiCalls()
        visitInquiryForm()
    })

    it ('throws validation for first and last name values greater than 50 characters', () => {
        const { lead: { influencer: { firstName, lastName }}} = fieldSelectors;
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
        const { lead: { influencer: { email }}} = fieldSelectors;
        const emailErrorMessage = 'Email must be valid';

        cy.get(email).type('notanemail.com').blur()
        duplicateModal.waitAndDismissModal()
        cy.get('.alert.alert-danger').should('contain', emailErrorMessage)
        cy.get(email).clear().type('goodemail@gmail.com').blur()
        duplicateModal.waitAndDismissModal()
        cy.get('.alert.alert-danger').should('not.contain', emailErrorMessage)
    })

    it ('throws validation when an email is greater than 100 characters', () => {
        const { lead: { influencer: { email }}} = fieldSelectors;
        const emailErrorMessage = 'Email can be at most 100 characters';

        cy.get(email)
            .type(`${getStringOfLength(92)}@test.com`, { delay: 1 })
            .blur()
        duplicateModal.waitAndDismissModal()
        cy.get('.alert.alert-danger').should('contain', emailErrorMessage)
        cy.get(email).type('{backspace}').blur()
        duplicateModal.waitAndDismissModal()
        cy.get('.alert.alert-danger').should('not.contain', emailErrorMessage)
    })

    it ('throws validation when address line1 or line2 is greater than 40 characters', () => {
        const { lead: { influencer: { address: { line1, line2 }}}} = fieldSelectors;
        const addressErrorMessage = line => `Address ${line} can be at most 40 characters`;

        cy.get(line1).type(getStringOfLength(41)).blur()
        cy.get('.alert.alert-danger').should('contain', addressErrorMessage(1))
        cy.get(line1).type('{backspace}').blur();
        cy.get('.alert.alert-danger').should('not.contain', addressErrorMessage(1))

        cy.get(line2).type(getStringOfLength(41)).blur()
        cy.get('.alert.alert-danger').should('contain', addressErrorMessage(2))
        cy.get(line2).type('{backspace}').blur();
        cy.get('.alert.alert-danger').should('not.contain', addressErrorMessage(2))
    })

    it ('throws validation when the city is greater than 30 characters', () => {
        const { lead: { influencer: { address: { city }}}} = fieldSelectors;
        const cityErrorMessage = 'City can be at most 30 characters';

        cy.get(city).type(getStringOfLength(31)).blur()
        cy.get('.alert.alert-danger').should('contain', cityErrorMessage)
        cy.get(city).type('{backspace}').blur();
        cy.get('.alert.alert-danger').should('not.contain', cityErrorMessage)
    })

    it ('throws required validation when phone number has a value but phone type does not', () => {
        const { lead: { influencer: { phone: { type, number }}}} = fieldSelectors;
        const errorMessage = 'Phone Type is required when Phone is entered';

        cy.get(number).type('5555555555').blur()
        duplicateModal.waitAndDismissModal()
        cy.get(type).focus().blur()
        cy.get('.alert.alert-danger').should('contain', errorMessage)
    })

    it ('throws validation when phone type has a value a value but phone number does not', () => {
        const { lead: { influencer: { phone: { type, number }}}} = fieldSelectors;
        const errorMessage = 'Phone is required when Phone Type is entered';

        cy.get(type).select(phoneTypes[0].text)
        cy.get(number).focus().blur()
        cy.get('.alert.alert-danger').should('contain', errorMessage)
    })

    it ('throws validation when phone number is in an incorrect format', () => {
        const { lead: { influencer: { phone: { number }}}} = fieldSelectors;
        const errorMessage = 'Phone is not Valid';

        cy.get(number).type('5555').blur()
        duplicateModal.waitAndDismissModal()
        cy.get('.alert.alert-danger').should('contain', errorMessage)
    })
})