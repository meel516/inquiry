/// <reference types="Cypress" />

// cy.wrap(modal).get('button') yields 3 buttons
// 0: 'None of These' button on first screen
// 1: 'Go Back' button on seccond screen
// 2: 'None of These' button on second screen

export const clickFirstNoneOfThese = () => {
    cy.get('.modal-content').within(modal => {
        cy.wrap(modal).get('button').eq(0).click();
    })
}

export const clickSecondNoneOfThese = () => {
    cy.get('.modal-content').within(modal => {
        cy.wrap(modal).get('button').eq(2).click();
    })
}

export const clickGoBack = () => {
    cy.get('.modal-content').within(modal => {
        cy.wrap(modal).get('button').eq(1).click();
    })
}

export const clickRowInGrid = () => {
    cy.get('.modal-content').within(modal => {
        cy.wrap(modal).get('.react-grid-Row').first().click();
    })
}

export const waitAndDismissModal = () => {
    cy.wait('@duplication')
    clickFirstNoneOfThese()
}