/// <reference types="Cypress" />
import { login, mockAllApiCalls, replaceFetch, visitInquiryForm } from '../utils/befores';
import { fieldSelectors } from '../utils';
import {
    additionalCareElements,
    community,
    duplicateModal,
    reactNumberFormat,
    submitButton,
} from '../utils/elements';

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

    it('can navigate and fill out the entire form', () => {
        // This test has no asserts. If it fails it most likely means the page was restuctured
        // in a way that makes the element selectors break
        const { lead: { influencer, prospect, secondPerson, adlNeeds, notes }, communities, lead } = fieldSelectors;

        // Influencer
        cy.get(influencer.firstName).type('Mister')
        cy.get(influencer.lastName).type('Smith')
        cy.get(influencer.phone.number).type('2222222222').blur()
        duplicateModal.clickRowInGrid()
        duplicateModal.clickGoBack()
        duplicateModal.clickFirstNoneOfThese()
        cy.get(influencer.phone.type).select('Home')
        cy.get(influencer.address.line1).type('6737 W Washington St')
        cy.get(influencer.address.line2).type('2300')
        cy.get(influencer.address.city).type('Milwaukee')
        cy.get(influencer.address.state).select('WI')
        cy.get(influencer.address.zip).type('53214')
        cy.get(notes.situation).type('getting old')

        // adl needs
        cy.get(adlNeeds.bathing).check()
        cy.get(adlNeeds.dressing).check()
        cy.get(adlNeeds.feeding).check()
        cy.get(adlNeeds.incontinence).check()
        cy.get(adlNeeds.medications).check()
        cy.get(adlNeeds.toileting).check()
        cy.get(adlNeeds.transferring).check()

        // additional care elements discovered
        // memory concerns
        additionalCareElements.selectMemoryConcerns()
        cy.get(lead.memoryConcerns.dementia).check()
        cy.get(lead.memoryConcerns.memoryLoss).check()
        cy.get(lead.memoryConcerns.wandering).check()
        cy.get(lead.memoryConcerns.repeatsStories).check()
        // mobility concerns
        additionalCareElements.selectMobilityConcerns()
        cy.get(lead.mobilityConcerns.fallRisk).check()
        cy.get(lead.mobilityConcerns.regularlyWalks).check()
        cy.get(lead.mobilityConcerns.personTransfer).check()
        cy.get(lead.mobilityConcerns.usesWheelChair).check()
        cy.get(lead.mobilityConcerns.secondPersonTransfer).check()
        cy.get(lead.mobilityConcerns.usesCane).check()
        // nutrition concerns
        additionalCareElements.selectNutritionConcerns()
        cy.get(lead.nutritionConcerns.diabetes).check()
        cy.get(lead.nutritionConcerns.lowSalt).check()
        cy.get(lead.nutritionConcerns.prescribedDiet).check()
        cy.get(lead.nutritionConcerns.notEatingWell).check()
        // current living situation
        additionalCareElements.selectCurrentLivingSituation()
        cy.get(lead.currentSituation).select('Adult Day Care')

        // prospect
        cy.get(prospect.firstName).type('Frank')
        cy.get(prospect.lastName).type('Smith')
        cy.get(prospect.phone.number).type('1234567890')
        cy.get(prospect.phone.type).select('Mobile')
        cy.get(prospect.email).type('test@gmail.com')
        cy.get(prospect.age).type('88')

        cy.get(lead.careType).select('Assisted Living')
        cy.get(notes.passionsPersonality).type('collects hummels')

        // Communities
        community.addCommunity();
        cy.get(communities.communityId(0)).type('5111{enter}')
        cy.get(communities.startingPrice(0)).type('123')
        cy.get(communities.secondPersonFee(0)).type('456')
        cy.get(communities.followUpAction(0)).select('Guest Stay')
        reactNumberFormat(communities.followupDate(0)).populate();
        cy.get(communities.freeMeal(0)).select('Dinner')
        cy.get(communities.note(0)).type('description...')
        community.removeCommunityAt(0);

        cy.get(notes.financialSituation).type('pretty flush')

        // financial options
        cy.get(lead.financialOptions.aidAttendance).check()
        cy.get(lead.financialOptions.familyContributions).check()
        cy.get(lead.financialOptions.homeOwner).check()
        cy.get(lead.financialOptions.ltcPolicy).check()

        cy.get(notes.additionalNotes).type('...')

        // drivers
        cy.get(lead.drivers.activities).check()
        cy.get(lead.drivers.accessToResidents).check()
        cy.get(lead.drivers.ageInPlace).check()
        cy.get(lead.drivers.care).check()
        cy.get(lead.drivers.location).check()
        cy.get(lead.drivers.peaceOfMind).check()
        cy.get(lead.drivers.petFriendly).check()
        cy.get(lead.drivers.safety).check()

        // second person
        cy.get(secondPerson.selected).check()
        cy.get(secondPerson.firstName).type('Nancy')
        cy.get(secondPerson.lastName).type('Smith')
        cy.get(secondPerson.phone.number).type('5555555555')
        cy.get(secondPerson.phone.type).select('Other')
        cy.get(secondPerson.email).type('test@yahoo.com')
        cy.get(notes.secondPersonNote).type('also old')

        // result of call section
        cy.get(lead.resultOfCall).select('New Lead No Visit')
        cy.get(lead.callingFor).select('Parent')
        cy.get(lead.reasonForCall).select('Respite')
        cy.get(lead.inquiryType).select('Call In')
        cy.get(lead.prospect.veteranStatus).select('Is not a Veteran')
        cy.get(lead.leadSource).select('Internet')
        cy.get(lead.leadSourceDetail).select('Brookdale Website')
        cy.get(lead.leadSourceSubDetail).click().type('Brookdale Life{enter}')
        cy.get(lead.umid).type('aaa')
        cy.get(lead.callerType).select('Male')

        submitButton.click()
        submitButton.dismissModal()
    })
})