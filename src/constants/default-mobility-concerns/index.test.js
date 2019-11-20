import { defaultMobilityConcerns } from './index'

test('test default mobility concerns', () => {

    const mobilityConcerns = defaultMobilityConcerns;
    expect(mobilityConcerns).toEqual({ fallRisk: false, regularlyWalks: false, personTransfer: false, usesWheelChair: false, secondPersonTransfer: false, usesCane: false })

})