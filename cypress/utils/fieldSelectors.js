import { fields } from './fields';

export const fieldSelectors = {
    lead: {
        influencer: {
            firstName: `input[name="${fields.lead.influencer.firstName}"]`,
            lastName: `input[name="${fields.lead.influencer.lastName}"]`,
            email: `input[name="${fields.lead.influencer.email}"]`,
            phone: {
                number: `input[name="${fields.lead.influencer.phone.number}"]`,
                type: `select[name="${fields.lead.influencer.phone.type}"]`,
            },
            address: {
                line1: `input[name="${fields.lead.influencer.address.line1}"]`,
                line2: `input[name="${fields.lead.influencer.address.line2}"]`,
                city: `input[name="${fields.lead.influencer.address.city}"]`,
                state: `select[name="${fields.lead.influencer.address.state}"]`,
                zip: `input[name="${fields.lead.influencer.address.zip}"]`,
            }
        },
        prospect: {
            firstName: `input[name="${fields.lead.prospect.firstName}"]`,
            lastName: `input[name="${fields.lead.prospect.lastName}"]`,
            email: `input[name="${fields.lead.prospect.email}"]`,
            age: `input[name="${fields.lead.prospect.age}"]`,
            veteranStatus: `select[name="${fields.lead.prospect.veteranStatus}"]`,
            phone: {
                number: `input[name="${fields.lead.prospect.phone.number}"]`,
                type: `select[name="${fields.lead.prospect.phone.type}"]`,
            },
        },
        adlNeeds: {
            bathing: `input[name="${fields.lead.adlNeeds.bathing}"]`,
            dressing: `input[name="${fields.lead.adlNeeds.dressing}"]`,
            feeding: `input[name="${fields.lead.adlNeeds.feeding}"]`,
            incontinence: `input[name="${fields.lead.adlNeeds.incontinence}"]`,
            medications: `input[name="${fields.lead.adlNeeds.medications}"]`,
            toileting: `input[name="${fields.lead.adlNeeds.toileting}"]`,
            transferring: `input[name="${fields.lead.adlNeeds.transferring}"]`,
            noAdlNeeds: `input[name="${fields.lead.adlNeeds.noAdlNeeds}"]`,
        },
        memoryConcerns: {
            dementia: `input[name="${fields.lead.memoryConcerns.alzDiagnosis}"]`,
            memoryLoss: `input[name="${fields.lead.memoryConcerns.argumentative}"]`,
            repeatsStories: `input[name="${fields.lead.memoryConcerns.forgetsRepeats}"]`,
            wandering: `input[name="${fields.lead.memoryConcerns.wandering}"]`,
        },
        mobilityConcerns: {
            fallRisk: `input[name="${fields.lead.mobilityConcerns.fallRisk}"]`,
            regularlyWalks: `input[name="${fields.lead.mobilityConcerns.walkerRegularly}"]`,
            personTransfer: `input[name="${fields.lead.mobilityConcerns.onePersTransfer}"]`,
            usesWheelChair: `input[name="${fields.lead.mobilityConcerns.wheelchairRegularly}"]`,
            secondPersonTransfer: `input[name="${fields.lead.mobilityConcerns.twoPersTransfer}"]`,
            usesCane: `input[name="${fields.lead.mobilityConcerns.caneRegularly}"]`,
        },
        nutritionConcerns: {
            diabetes: `input[name="${fields.lead.nutritionConcerns.diabetesDiagnosis}"]`,
            lowSalt: `input[name="${fields.lead.nutritionConcerns.lowSaltLowDiet}"]`,
            prescribedDiet: `input[name="${fields.lead.nutritionConcerns.otherDietRestrictions}"]`,
            notEatingWell: `input[name="${fields.lead.nutritionConcerns.notEatingWell}"]`,
        },
        financialOptions: {
            aidAttendance: `input[name="${fields.lead.financialOptions.aidAttendance}"]`,
            familyContributions: `input[name="${fields.lead.financialOptions.familyContributions}"]`,
            homeOwner: `input[name="${fields.lead.financialOptions.homeOwner}"]`,
            ltcPolicy: `input[name="${fields.lead.financialOptions.ltcPolicy}"]`,
        },
        drivers: {
            activities: `input[name="${fields.lead.drivers.activities}"]`,
            accessToResidents: `input[name="${fields.lead.drivers.accessToResidents}"]`,
            ageInPlace: `input[name="${fields.lead.drivers.ageInPlace}"]`,
            care: `input[name="${fields.lead.drivers.care}"]`,
            location: `input[name="${fields.lead.drivers.location}"]`,
            peaceOfMind: `input[name="${fields.lead.drivers.peaceOfMind}"]`,
            petFriendly: `input[name="${fields.lead.drivers.petFriendly}"]`,
            safety: `input[name="${fields.lead.drivers.safety}"]`,
            didNotDiscloseDriver: `input[name="${fields.lead.drivers.didNotDiscloseDriver}"]`,
        },
        secondPerson: {
            selected: `input[name="${fields.lead.secondPerson.selected}"]`,
            firstName: `input[name="${fields.lead.secondPerson.firstName}"]`,
            lastName: `input[name="${fields.lead.secondPerson.lastName}"]`,
            email: `input[name="${fields.lead.secondPerson.email}"]`,
            phone: {
                number: `input[name="${fields.lead.secondPerson.phone.number}"]`,
                type: `select[name="${fields.lead.secondPerson.phone.type}"]`,
            }
        },
        notes: {
            situation: `textarea[name="${fields.lead.notes.situation}"]`,
            passionsPersonality: `textarea[name="${fields.lead.notes.passionsPersonality}"]`,
            financialSituation: `textarea[name="${fields.lead.notes.financialSituation}"]`,
            additionalNotes: `textarea[name="${fields.lead.notes.additionalNotes}"]`,
            secondPersonNote: `textarea[name="${fields.lead.notes.secondPersonNote}"]`,
        },
        callerType: `select[name="${fields.lead.callerType}"]`, //What is the gender of the caller?
        callingFor: `select[name="${fields.lead.callingFor}"]`, // I am calling for
        careType: `select[name="${fields.lead.careType}"]`, //Care Level Recommended
        currentSituation: `select[name="${fields.lead.currentSituation}"]`,
        inquiryType: `select[name="${fields.lead.inquiryType}"]`, //Inquiry Method
        resultOfCall: `select[name="${fields.lead.resultOfCall}"]`,
        reasonForCall: `select[name="${fields.lead.reasonForCall}"]`,
        leadSource: `select[name="${fields.lead.leadSource}"]`,
        leadSourceDetail: `select[name="${fields.lead.leadSourceDetail}"]`,
        leadSourceSubDetail: `div[id="${fields.lead.leadSourceSubDetail}"]`, // a react-select (this input is hidden)
        referralText: `input[name="${fields.lead.referralText}"]`,
        leadSource2nd: `select[name="${fields.lead.leadSource2nd}"]`,
        leadSourceDetail2nd: `select[name="${fields.lead.leadSourceDetail2nd}"]`,
        leadSourceSubDetail2nd: `div[id="${fields.lead.leadSourceSubDetail2nd}"]`, // a react-select (this input is hidden)
        referralText2nd: `input[name="${fields.lead.referralText2nd}"]`,
        umid: `input[name="${fields.lead.umid}"]`,
    },
    communities: {
        communityId: i => `div[id="communities[${i}].communityId"]`,  // a react-select
        startingPrice: i => `input[name="communities[${i}].startingPrice"]`,
        secondPersonFee: i => `input[name="communities[${i}].secondPersonFee"]`,
        communityFee: i => `input[name="communities[${i}].communityFee"]`,
        followUpAction: i => `select[name="communities[${i}].followUpAction"]`,
        followupDate: i => `input[name="communities[${i}].followupDate"]`,
        freeMeal: i => `select[name="communities[${i}].freeMeal"]`,
        note: i => `textarea[name="communities[${i}].note"]`,
    }
}