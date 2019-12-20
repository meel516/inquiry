/// <reference types="Cypress" />

class ReactNumberFormat {
    constructor (selector) {
        this.selector = selector;
        this.elem = cy.get(selector);
    }

    get = () => {
        return cy.get(this.selector)
    }

    populate = (
        month  = '12',
        day    = '12',
        year   = '2020',
        hour   = '6',
        minute = '30',
        ampm   = 'am',
    ) => {
        this.elem.siblings().not('span').then(fields => {
            cy.wrap(fields).eq(0).type(month)
            cy.wrap(fields).eq(1).type(day)
            cy.wrap(fields).eq(2).type(year)
            cy.wrap(fields).eq(3).type(hour)
            cy.wrap(fields).eq(4).type(minute)
            cy.wrap(fields).eq(5).select(ampm.toLowerCase(), { force: true })
        })
        return this.elem;
    }
}

export const reactNumberFormat = (selector) => {
    return new ReactNumberFormat(selector);
}