/// <reference types="Cypress" />

class ReactSelect {
    constructor (selector) {
        this.selector = selector;
    }

    get = () => {
        return cy.get(this.selector)
    }

    focus = () => {
        return cy.get(`${this.selector} :input[id^="react-select"]`).focus()
    }

    blur = () => {
        return cy.get(`${this.selector} :input[id^="react-select"]`).blur()
    }
}

export const reactSelect = (selector) => {
    return new ReactSelect(selector);
}