/// <reference types="Cypress" />
import { login } from '../utils/befores';

describe('Login', () => {
    beforeEach(() => {
        login();
    })
    
    it('successfully logs in and navigates to the inquiry form', () => {
        cy.visit('/');
        cy.url().should('include', '/inquiryForm');
    })
})