
export default (leadId, { umid, careType, drivers, financialOptions, adlNeeds, memoryConcerns, mobilityConcerns, nutritionConcerns }, user) => {
    if (leadId && careType) {
        return {
            leadId,
            username: user.username,
            careTypeId: Number(careType),
            salesLeadDriver: drivers,
            salesLeadFinancialOption: financialOptions,
            umId: umid,
            ...adlNeeds,
            ...memoryConcerns,
            ...mobilityConcerns,
            ...nutritionConcerns,
        }
    }
    return null;
}
