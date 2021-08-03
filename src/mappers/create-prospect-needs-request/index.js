
export default (leadId, { careType, drivers, financialOptions, adlNeeds, memoryConcerns, mobilityConcerns, nutritionConcerns }, user) => {
    if (leadId && careType) {
        return {
            leadId,
            username: user.username,
            careTypeId: Number(careType),
            salesLeadDriver: drivers,
            salesLeadFinancialOption: financialOptions,
            ...adlNeeds,
            ...memoryConcerns,
            ...mobilityConcerns,
            ...nutritionConcerns,
        }
    }
    return null;
}
