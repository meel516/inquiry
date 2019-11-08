import { get } from 'lodash'
export default (lead = {}) => ({
    careTypeId: lead.careType,
    currentSituationId: lead.currentSituation,

    bathing: get(lead, 'adlNeeds.bathing'), 
    incontinence: get(lead, 'adlNeeds.incontinence'), 
    transferring: get(lead, 'adlNeeds.transferring'), 
    dressing: get(lead, 'adlNeeds.dressing'), 
    medications: get(lead, 'adlNeeds.medications'), 
    feeding: get(lead, 'adlNeeds.feeding'), 
    toileting: get(lead, 'adlNeeds.toileting'), 

    alzDiagnosis: get(lead, 'memoryConcerns.dementia'), 
    argumentative: get(lead, 'memoryConcerns.memoryLoss'), 
    forgetsRepeats: get(lead, 'memoryConcerns.repeatsStories'), 
    wandering: get(lead, 'memoryConcerns.wandering'), 

    fallRisk: get(lead, 'mobilityConcerns.fallRisk'), 
    walkerRegularly: get(lead, 'mobilityConcerns.regularlyWalks'), 
    caneRegularly: get(lead, 'mobilityConcerns.usesCane'), 
    wheelchairRegularly: get(lead, 'mobilityConcerns.usesWheelChair'), 
    onePersTransfer: get(lead, 'mobilityConcerns.personTransfer'), 
    twoPersTransfer: get(lead, 'mobilityConcerns.secondPersonTransfer'), 

    diabetesDiagnosis: get(lead, 'nutritionConcerns.diabetes'), 
    lowSaltLowDiet: get(lead, 'nutritionConcerns.lowSalt'), 
    otherDietRestrictions: get(lead, 'nutritionConcerns.prescribedDiet'), 
    notEatingWell: get(lead, 'nutritionConcerns.notEatingWell')
})
