
export default (nutritionConcerns = {}) => {
    return {
        diabetesDiagnosis: nutritionConcerns.diabetes,
        lowSaltLowDiet: nutritionConcerns.lowSalt,
        otherDietRestrictions: nutritionConcerns.prescribedDiet,
        notEatingWell: nutritionConcerns.notEatingWell,
    }
}