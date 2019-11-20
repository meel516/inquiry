import mapAdlNeedsToSales from '../map-adl-needs-to-sales'
import mapMemoryConcernsToSales from '../map-memory-concerns-to-sales'
import mapMobilityConcernsToSales from '../map-mobility-concerns-to-sales'
import mapNutritionConcernsToSales from '../map-nutrition-concerns-to-sales'

export default (leadId, { careType, adlNeeds, memoryConcerns, mobilityConcerns, nutritionConcerns }, user) => {
    if (leadId && careType) {
        return {
            leadId,
            username: user.username,
            careTypeId: Number(careType),
            ...adlNeeds,
            ...memoryConcerns,
            ...mobilityConcerns,
            ...nutritionConcerns,
        }
    }
    return null;
}
