/// <reference types="Cypress" />
import { fieldSelectors, getStringOfLength } from '../utils';
import { community, reactSelect } from '../utils/elements';
import { login, mockAllApiCalls, replaceFetch } from '../utils/befores';
import followUpActions from '../fixtures/followUpActions.json';

const assertNumberCommunities = (expected) => {
    cy.get('div.communities-container').then(comms => {
        assert.equal(comms.length, expected)
    })
}

describe('Add Community', () => {
    before(() => {
        replaceFetch();
    })

    beforeEach(() => {
        cy.server();
        mockAllApiCalls();
        login();
        cy.visit('/inquiryform')
    })

    it ('disables add community button when limit of 5 is reached', () => {
        community.addCommunity()
        assertNumberCommunities(1)
        community.addCommunity()
        assertNumberCommunities(2)
        community.addCommunity()
        assertNumberCommunities(3)
        community.addCommunity()
        assertNumberCommunities(4)
        community.addCommunity()
        assertNumberCommunities(5)

        cy.get('button').contains('Add Community').should('have.attr', 'disabled')

        community.removeCommunityAt(0)
        assertNumberCommunities(4)
        cy.get('button').contains('Add Community').should('not.have.attr', 'disabled')
    })

    it ('shows the free meal input for Guest Stay and Visit/Appt Scheduled follow up actions', () => {
        const freeMealFollowUpActions = new Set([ '20', '5' ]);
        community.addCommunity()

        followUpActions.forEach(option => {
            const check = freeMealFollowUpActions.has(option.value) ? 'contain' : 'not.contain';
            cy.get(fieldSelectors.communities.followUpAction(0)).select(option.value).blur()
            cy.get('label').should(check, 'Does this Visit include a Free Meal?')
        })
    })

    it ('shows an error message when attempting to add two of the same community', () => {
        const duplicateCommunityMessage = 'You have added a duplicate community';

        const assertNumberDuplicates = (expected) => {
            const check = expected === 0 ? 'not.contain' : 'contain';
            cy.get('.alert.alert-danger').should(check, duplicateCommunityMessage).then(dupes => {
                assert.equal(dupes.length, expected)
            })
        }

        const typeAndAssertCommunityId = (index, text = '51111{enter}') => {
            cy.get(fieldSelectors.communities.communityId(index)).type(text)
            reactSelect(fieldSelectors.communities.communityId(index)).focus().blur()
            assertNumberDuplicates(index)            
        }

        community.addCommunity()
        typeAndAssertCommunityId(0)
        community.addCommunity()
        typeAndAssertCommunityId(1)
        community.addCommunity()
        typeAndAssertCommunityId(2)
        community.addCommunity()
        typeAndAssertCommunityId(3)
        community.addCommunity()
        typeAndAssertCommunityId(4)

        community.removeCommunityAt(0)
        assertNumberDuplicates(3)
        community.removeCommunityAt(0)
        assertNumberDuplicates(2)
        community.removeCommunityAt(0)
        assertNumberDuplicates(1)
        community.removeCommunityAt(0)
        assertNumberDuplicates(0)
    })

    it ('only allows description values of 4000 characters or less', () => {
        const validationMessage = 'Description can be at most 4000 characters';

        community.addCommunity()
        cy.get(fieldSelectors.communities.followUpAction(0)).select('3').blur()

        cy.get(fieldSelectors.communities.note(0))
            .clear()
            .fastType(getStringOfLength(4000))
            .blur()
        cy.get('.alert.alert-danger').should('not.contain', validationMessage)

        cy.get(fieldSelectors.communities.note(0))
            .clear()
            .fastType(getStringOfLength(4001))
            .blur()
        cy.get('.alert.alert-danger').should('contain', validationMessage)
    })
})