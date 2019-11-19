
export default (mobilityConcerns = {}) => {
    return {
        fallRisk: mobilityConcerns.fallRisk,
        walkerRegularly: mobilityConcerns.regularlyWalks,
        caneRegularly: mobilityConcerns.usesCane,
        wheelchairRegularly: mobilityConcerns.usesWheelChair,
        onePersTransfer: mobilityConcerns.personTransfer,
        twoPersTransfer: mobilityConcerns.secondPersonTransfer,
    }
}