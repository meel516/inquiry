/// <reference types="Cypress" />
import { login, mockAllApiCalls, replaceFetch, visitInquiryForm } from '../utils/befores';
import { getStringOfLength, fieldSelectors } from '../utils';

describe('Notes', () => {
    before(() => {
        replaceFetch()
        login()
    })

    beforeEach(() => {
        cy.server()
        mockAllApiCalls()
        visitInquiryForm()
    })

    it ('throws validation when situation is greater than 4000 characters', () => {
        const validationMessage = 'Situation can be at most 4000 characters';

        cy.get(fieldSelectors.lead.notes.situation)
            .clear()
            .fastType(getStringOfLength(4000))
            .blur()
        cy.get('.alert.alert-danger').should('not.contain', validationMessage)

        cy.get(fieldSelectors.lead.notes.situation)
            .clear()
            .fastType(getStringOfLength(4001))
            .blur()
        cy.get('.alert.alert-danger').should('contain', validationMessage)
    })

    it ('throws validation when passionsPersonality is greater than 4000 characters', () => {
        const validationMessage = 'Passions & Personality can be at most 4000 characters';

        cy.get(fieldSelectors.lead.notes.passionsPersonality)
            .clear()
            .fastType(getStringOfLength(4000))
            .blur()
        cy.get('.alert.alert-danger').should('not.contain', validationMessage)

        cy.get(fieldSelectors.lead.notes.passionsPersonality)
            .clear()
            .fastType(getStringOfLength(4001))
            .blur()
        cy.get('.alert.alert-danger').should('contain', validationMessage)
    })

    it ('throws validation when financialSituation is greater than 4000 characters', () => {
        const validationMessage = 'Financial Situation can be at most 4000 characters';

        cy.get(fieldSelectors.lead.notes.financialSituation)
            .clear()
            .fastType(getStringOfLength(4000))
            .blur()
        cy.get('.alert.alert-danger').should('not.contain', validationMessage)

        cy.get(fieldSelectors.lead.notes.financialSituation)
            .clear()
            .fastType(getStringOfLength(4001))
            .blur()
        cy.get('.alert.alert-danger').should('contain', validationMessage)
    })

    it ('throws validation when additionalNotes is greater than 4000 characters', () => {
        const validationMessage = 'Additional Notes can be at most 4000 characters';

        cy.get(fieldSelectors.lead.notes.additionalNotes)
            .clear()
            .fastType(getStringOfLength(4000))
            .blur()
        cy.get('.alert.alert-danger').should('not.contain', validationMessage)

        cy.get(fieldSelectors.lead.notes.additionalNotes)
            .clear()
            .fastType(getStringOfLength(4001))
            .blur()
        cy.get('.alert.alert-danger').should('contain', validationMessage)
    })

    it ('throws validation when secondPersonNote is greater than 4000 characters', () => {
        const validationMessage = '2nd Person Situation can be at most 4000 characters';

        cy.get(fieldSelectors.lead.secondPerson.selected).check()

        cy.get(fieldSelectors.lead.notes.secondPersonNote)
            .clear()
            .fastType(getStringOfLength(4000))
            .blur()
        cy.get('.alert.alert-danger').should('not.contain', validationMessage)

        cy.get(fieldSelectors.lead.notes.secondPersonNote)
            .clear()
            .fastType(getStringOfLength(4001))
            .blur()
        cy.get('.alert.alert-danger').should('contain', validationMessage)
    })
})