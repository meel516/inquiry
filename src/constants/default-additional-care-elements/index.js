import { defaultMemoryConcerns } from '../default-memory-concerns';
import { defaultMobilityConcerns } from '../default-mobility-concerns';
import { defaultNutritionConcerns } from '../default-nutrition-concerns';

export const MEMORY_CONCERNS = 1;
export const MOBILITY_CONCERNS = 2;
export const NUTRITION_CONCERNS = 3;
export const CURRENT_LIVING_SITUATION = 4;

export const additionalCareElements = [
    { value: MEMORY_CONCERNS, label: 'Memory Concerns', field: 'memoryConcerns', default: defaultMemoryConcerns },
    { value: MOBILITY_CONCERNS, label: 'Mobility Concerns', field: 'mobilityConcerns', default: defaultMobilityConcerns },
    { value: NUTRITION_CONCERNS, label: 'Nutrition Concerns', field: 'nutritionConcerns', default: defaultNutritionConcerns },
    { value: CURRENT_LIVING_SITUATION, label: 'Current Living Situation', field: 'currentSituation', default: '' },
  ];
  