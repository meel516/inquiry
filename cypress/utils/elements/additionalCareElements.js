/// <reference types="Cypress" />

const MemoryConcerns = 'Memory Concerns';
const MobilityConcerns = 'Mobility Concerns';
const NutritionConcerns = 'Nutrition Concerns';
const CurrentLivingSituation = 'Current Living Situation';;

export const get = () => {
    return cy.get('#additional-care-elements-discovered');
}

export const selectMemoryConcerns = () => {
    get().click().type(`${MemoryConcerns}{enter}`);
}

export const selectMobilityConcerns = () => {
    get().click().type(`${MobilityConcerns}{enter}`);
}

export const selectNutritionConcerns = () => {
    get().click().type(`${NutritionConcerns}{enter}`);
}

export const selectCurrentLivingSituation = () => {
    get().click().type(`${CurrentLivingSituation}{enter}`);
}

export const removeMemoryConcerns = () => {
    get().contains(MemoryConcerns).siblings().click();
}

export const removeMobilityConcerns = () => {
    get().contains(MobilityConcerns).siblings().click();
}

export const removeNutritionConcerns = () => {
    get().contains(NutritionConcerns).siblings().click();
}

export const removeCurrentLivingSituation = () => {
    get().contains(CurrentLivingSituation).siblings().click();
}