
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
