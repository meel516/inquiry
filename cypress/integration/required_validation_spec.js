/// <reference types="Cypress" />
import { fieldSelectors } from '../utils';
import { community, reactNumberFormat, reactSelect } from '../utils/elements';
import { login, mockAllApiCalls, replaceFetch, visitInquiryForm } from '../utils/befores';

const requiredMessages = {
    firstName: 'First Name is required',
    lastName: 'Last Name is required',
    careType: 'Care Level Recommended is required',
    drivers: "Drivers at least one check box is required",
    resultOfCall: 'Result of Call is required',
    callingFor: 'Calling For is required',
    reasonForCall: 'Reason For Call is required',
    inquiryType: 'Inquiry Method is required',
    veteranStatus: 'Veteran Status is required',
    leadSource: 'Lead Source is required',
    leadSourceDetail: 'Lead Source Detail is required',
    umid: 'UMID is required',
    callerType: 'Gender of Caller is required',
    communityId: 'Community is required',
    followupDate: 'Next Steps Date is required',
    communityNote: 'Description is required',
}

const validValues = {
    firstName: 'test',
    lastName: 'test',
    careType: 'BHS',
    resultOfCall: 'New Lead No Visit',
    callingFor: 'Parent',
    reasonForCall: 'Respite',
    inquiryType: 'Chat',
    veteranStatus: 'Is not a Veteran',
    leadSource: 'Internet',
    leadSourceDetail: 'Brookdale Website',
    umid: 'test',
    callerType: 'Female',
    communityId: 52199,
    followupDate: '2020-12-12T14:30:00.000Z',
    communityNote: 'test',
}

describe('Inquiry Form', () => {
    before(() => {
        replaceFetch()
        login()
    })

    beforeEach(() => {
        cy.server()
        mockAllApiCalls()
        visitInquiryForm()
    })

    it ('shows a required error for all required fields', () => {
        const { lead: { influencer, prospect, secondPerson, careType, drivers, resultOfCall, callingFor, reasonForCall, inquiryType,
            leadSource, leadSourceDetail, umid, callerType }, communities } = fieldSelectors;

        cy.get(influencer.firstName).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.firstName)
        cy.get(influencer.firstName).type(validValues.firstName).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.firstName)

        cy.get(influencer.lastName).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.lastName)
        cy.get(influencer.lastName).type(validValues.lastName).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.lastName)

        cy.get(prospect.firstName).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.firstName)
        cy.get(prospect.firstName).type(validValues.firstName).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.firstName)

        cy.get(prospect.lastName).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.lastName)
        cy.get(prospect.lastName).type(validValues.lastName).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.lastName)

        cy.get(secondPerson.selected).check()
        cy.get(secondPerson.firstName).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.firstName)
        cy.get(secondPerson.firstName).type(validValues.firstName).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.firstName)

        cy.get(secondPerson.lastName).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.lastName)
        cy.get(secondPerson.lastName).type(validValues.lastName).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.lastName)

        cy.get(careType).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.careType)
        cy.get(careType).select(validValues.careType).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.careType)

        cy.get(resultOfCall).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.resultOfCall)
        cy.get(resultOfCall).select(validValues.resultOfCall).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.resultOfCall)

        cy.get(callingFor).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.callingFor)
        cy.get(callingFor).select(validValues.callingFor).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.callingFor)

        cy.get(reasonForCall).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.reasonForCall)
        cy.get(reasonForCall).select(validValues.reasonForCall).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.reasonForCall)

        cy.get(inquiryType).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.inquiryType)
        cy.get(inquiryType).select(validValues.inquiryType).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.inquiryType)

        cy.get(prospect.veteranStatus).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.veteranStatus)
        cy.get(prospect.veteranStatus).select(validValues.veteranStatus).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.veteranStatus)

        cy.get(leadSource).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.leadSource)
        cy.get(leadSource).select(validValues.leadSource).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.leadSource)

        cy.get(leadSourceDetail).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.leadSourceDetail)
        cy.get(leadSourceDetail).select(validValues.leadSourceDetail).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.leadSourceDetail)

        cy.get(umid).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.umid)
        cy.get(umid).type(validValues.umid).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.umid)

        cy.get(callerType).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.callerType)
        cy.get(callerType).select(validValues.callerType).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.callerType)

        community.addCommunity()
        reactSelect(communities.communityId(0)).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.communityId)
        cy.get(communities.communityId(0)).type('51111{enter}')
        reactSelect(communities.communityId(0)).focus().blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.communityId)

        cy.get(communities.followUpAction(0)).select('25').blur() // Send Personal Note

        reactNumberFormat(communities.followupDate(0)).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.followupDate)
        reactNumberFormat(communities.followupDate(0)).populate().blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.followupDate)

        cy.get(communities.note(0)).focus().blur()
        cy.get('.alert.alert-danger').should('contain', requiredMessages.communityNote)
        cy.get(communities.note(0)).type(validValues.communityNote).blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.communityNote)
    })

    it ('does not show a required error for lead source detail when no lead source selected', () => {
        const { lead: { leadSource, leadSourceDetail }} = fieldSelectors;

        cy.visit('/inquiryform')
    
        cy.get(leadSource).focus().blur()
        cy.get(leadSourceDetail).focus().blur()
        cy.get('.alert.alert-danger').should('not.contain', requiredMessages.leadSourceDetail)
    })
})