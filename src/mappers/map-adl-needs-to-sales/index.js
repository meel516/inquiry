
export default (adlNeeds = {}) => {
    return {
        bathing: adlNeeds.bathing,
        incontinence: adlNeeds.incontinence,
        transferring: adlNeeds.transferring,
        dressing: adlNeeds.dressing,
        medications: adlNeeds.medications,
        feeding: adlNeeds.feeding,
        toileting: adlNeeds.toileting,
    }
}