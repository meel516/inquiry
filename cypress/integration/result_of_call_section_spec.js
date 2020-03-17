/// <reference types="Cypress" />
import { login, mockAllApiCalls, replaceFetch, visitInquiryForm } from '../utils/befores';
import { getStringOfLength, fieldSelectors } from '../utils';
import leadSourceOptions from '../fixtures/inquiryLeadSource';

describe('Result of Call Section', () => {
    describe('Standard Server Responses', () => {
        before(() => {
            replaceFetch()
            login()
        })
    
        beforeEach(() => {
            cy.server()
            mockAllApiCalls()
            visitInquiryForm()
        })
    
        it ('throws validation when umid is greater than 36 characters', () => {
            const validationMessage = 'UMID can be at most 36 characters';
            cy.get(fieldSelectors.lead.umid).type(getStringOfLength(37)).blur()
            cy.get('.alert.alert-danger').should('contain', validationMessage)
            cy.get(fieldSelectors.lead.umid).type('{backspace}').blur()
            cy.get('.alert.alert-danger').should('not.contain', validationMessage)
        })
    })

    describe ('Empty Lead Source Details response', () => {
        it ('lead source detail is not required when there are none returned from the api', () => {
            replaceFetch()
            login()
            cy.server()
            cy.route({
                method: 'GET',
                url: '/Sims/api/dropdowns/inquiryLeadSource',
                response: 'fixture:inquiryLeadSource.json',
            }).as('inquiryLeadSource')
            cy.route({
                method: 'GET',
                url: '/Sims/api/dropdowns/inquiryLeadSource/*/inquiryLeadSourceDetails',
                response: [],
            })
            visitInquiryForm()

            cy.get(fieldSelectors.lead.leadSource).select(leadSourceOptions[0].value)
            cy.get(fieldSelectors.lead.leadSourceDetail).focus().blur()
            cy.get('.alert.alert-danger').should('not.contain', 'Lead Source Detail is required')
        })
    })
})