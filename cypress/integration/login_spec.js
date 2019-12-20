/// <reference types="Cypress" />

before(() => {
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
})

describe('Login', () => {
    it('successfully logs in and navigates to the inquiry form', () => {
        cy.visit('/');
        cy.url().should('include', '/inquiryForm');
    })
})