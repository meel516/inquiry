import { get } from 'lodash'
export default (lead = {}) => ({
    careTypeId: lead.careType,
    currentSituationId: lead.currentSituation,

    bathing: get(lead, 'adlNeeds.bathing'), 
    incontinence: get(lead, 'adlNeeds.incontinence'), 
    transferring: get(lead, 'adlNeeds.transferring'),
    noAdlNeeds: get(lead, 'adlNeeds.noAdlNeeds'),
    dressing: get(lead, 'adlNeeds.dressing'),
    medications: get(lead, 'adlNeeds.medications'), 
    feeding: get(lead, 'adlNeeds.feeding'), 
    toileting: get(lead, 'adlNeeds.toileting'),

    alzDiagnosis: get(lead, 'memoryConcerns.alzDiagnosis'), 
    argumentative: get(lead, 'memoryConcerns.argumentative'), 
    forgetsRepeats: get(lead, 'memoryConcerns.forgetsRepeats'), 
    wandering: get(lead, 'memoryConcerns.wandering'), 

    fallRisk: get(lead, 'mobilityConcerns.fallRisk'), 
    walkerRegularly: get(lead, 'mobilityConcerns.walkerRegularly'), 
    caneRegularly: get(lead, 'mobilityConcerns.caneRegularly'), 
    wheelchairRegularly: get(lead, 'mobilityConcerns.wheelchairRegularly'), 
    onePersTransfer: get(lead, 'mobilityConcerns.onePersTransfer'), 
    twoPersTransfer: get(lead, 'mobilityConcerns.twoPersTransfer'), 

    diabetesDiagnosis: get(lead, 'nutritionConcerns.diabetesDiagnosis'), 
    lowSaltLowDiet: get(lead, 'nutritionConcerns.lowSaltLowDiet'), 
    otherDietRestrictions: get(lead, 'nutritionConcerns.otherDietRestrictions'), 
    notEatingWell: get(lead, 'nutritionConcerns.notEatingWell')
})
