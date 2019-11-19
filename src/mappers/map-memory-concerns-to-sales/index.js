
export default (memoryConcerns = {}) => {
    return {
        alzDiagnosis: memoryConcerns.dementia,
        argumentative: memoryConcerns.memoryLoss,
        forgetsRepeats: memoryConcerns.repeatsStories,
        wandering: memoryConcerns.wandering,
    }
}