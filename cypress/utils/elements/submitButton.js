/// <reference types="Cypress" />

export const click = () => {
    cy.get('button').contains('Submit').click();
}

export const dismissModal = () => {
    cy.get('.modal-content').within(modal => {
        cy.wrap(modal).get('button').contains('No').click();
    })
}

export const acceptModal = () => {
    cy.get('.modal-content').within(modal => {
        cy.wrap(modal).get('button').contains('Yes').click();
    })
}