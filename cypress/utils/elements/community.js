/// <reference types="Cypress" />

export const addCommunity = () => {
    cy.get('button').contains('Add Community').click();
}

export const removeCommunityAt = (index) => {
    cy.get('.communities-container').eq(index).find('button').contains('Remove').click();
}