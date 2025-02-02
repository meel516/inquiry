/// <reference types="Cypress" />
let polyfill = null;

// fetch needs to be mocked out until this cypress issue is closed
// https://github.com/cypress-io/cypress/issues/95
const setupFetch = () => {
    Cypress.on('window:before:load', (win) => {
        delete win.fetch;
        win.eval(polyfill);
        win.fetch = win.unfetch;
    })
}

export const replaceFetch = () => {
    if (polyfill) {
        setupFetch();
    } else {
        cy.request('https://unpkg.com/unfetch/dist/unfetch.umd.js')
            .then((response) => {
                polyfill = response.body;
                setupFetch();
            })
    }
}

export const login = () => {
    cy.request({
        method: 'POST',
        url: 'https://brookdaledev.oktapreview.com/api/v1/authn',
        body: {
            username: 'svc_connctr_dev@brookdale.com',
            password: 'fL@7B5a*wM28Dv6gR%emZ',
        }
    }).then(({ body: { sessionToken }}) => {
        cy.request('https://brookdaledev.oktapreview.com/oauth2/v1/authorize?client_id=0oan71spbbm4cMHzU0h7&nonce=cTVNF6BWEZ1P08IR34syVygoogngafw2Le1r2eXSqrpaycsnxOOD39ZDT8Rqur9F&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fimplicit%2Fcallback&response_mode=fragment&response_type=id_token%20token&state=WMWeghNukdXh4VZZQrLuC4aOGy1kkfY3B8bhtJlOX96AkgJQLoyNZ3ZJH1xFLXuM&scope=openid%20email%20profile&sessionToken=' + sessionToken)
    })
}

export const setupDropdownMocks = () => {
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/resultOfCall',
        response: 'fixture:resultOfCall.json',
    }).as('resultOfCall')
    cy.route({
        method: 'POST',
        url: '/CommunitySearch/service/searchByAppAndUser',
        response: 'fixture:communities.json',
    }).as('communities')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/phoneTypes',
        response: 'fixture:phoneTypes.json',
    }).as('phoneTypes')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/stateProv',
        response: 'fixture:stateProv.json',
    }).as('stateProv')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/careTypes',
        response: 'fixture:careTypes.json',
    }).as('careTypes')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/followUpActions',
        response: 'fixture:followUpActions.json',
    }).as('followUpActions')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/interestReason',
        response: 'fixture:interestReason.json',
    }).as('interestReason')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/inquiryTypes',
        response: 'fixture:inquiryTypes.json',
    }).as('inquiryTypes')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/veteranStatus',
        response: 'fixture:veteranStatus.json',
    }).as('veteranStatus')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/inquiryLeadSource',
        response: 'fixture:inquiryLeadSource.json',
    }).as('inquiryLeadSource')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/inquiryLeadSource/*/inquiryLeadSourceDetails',
        response: 'fixture:inquiryLeadSourceDetails.json',
    }).as('inquiryLeadSourceDetails')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/inquiryLeadSourceDetail/*/inquiryLeadSourceSubDetails',
        response: 'fixture:inquiryLeadSourceSubDetails.json',
    }).as('inquiryLeadSourceSubDetails')
    cy.route({
        method: 'GET',
        url: '/Sims/api/dropdowns/currentSituation',
        response: 'fixture:currentSituation.json',
    }).as('currentSituation')
}

export const setupDuplicateModalMocks = () => {
    cy.route({
        method: 'POST',
        url: '/Sims/api/contact/duplication',
        response: 'fixture:duplication.json',
    }).as('duplication')
    cy.route({
        method: 'GET',
        url: '/Sims/api/lead/contact/*',
        response: 'fixture:leadContact.json',
    }).as('duplicationLead')
}

export const mockAllApiCalls = () => {
    setupDropdownMocks();
    setupDuplicateModalMocks();
}

export const visitInquiryForm = () => {
    cy.visit('/inquiryform')
    // wait for one of the initial calls (lead source is usually the last in line)
    cy.wait('@inquiryLeadSource');
}