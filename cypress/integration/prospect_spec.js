/// <reference types="Cypress" />
import { login, setupDropdownMocks, replaceFetch } from '../utils/befores';
import { fields, fieldSelectors } from '../utils';

describe('Prospect Section', () => {
    before(() => {
        replaceFetch();
    })

    beforeEach(() => {
        cy.server();
        setupDropdownMocks();
        login();
    })

    it ('hides name, phone, and email fields when callingFor = "Myself"', () => {
        const { lead: { callingFor }} = fieldSelectors;
        const { lead } = fields;
        const fieldsToRemove = [
            lead.prospect.firstName,
            lead.prospect.lastName,
            lead.prospect.phone.number,
            lead.prospect.phone.type,
            lead.prospect.email,
        ];

        cy.visit('/inquiryform')
        cy.get(callingFor).select('Myself')
        cy.get('[name^="lead.prospect."]').then(elements => {
            for (const elem in elements) {
                expect(fieldsToRemove.indexOf(elem.name)).to.equal(-1)
            }
        })
    })
})