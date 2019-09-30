
import { ObjectMappingService } from '../Types'
import { CommunityService } from '../CommunityServices'

test('creates prospect request with no prospect/lead information', () => {
    const prospect = ObjectMappingService.createProspectRequest(null, null);

    expect(prospect).toEqual(undefined);

});

test('creates prospect request based upon self', () => {
    const lead = ObjectMappingService.createEmptyLead();
    const community = CommunityService.createCommunity();

    const {prospect, influencer} = lead;
    lead.callingFor = 'Myself'
    influencer.firstName = 'James'
    influencer.lastName = 'Monroe'

    const salesLead = ObjectMappingService.createProspectRequest(lead, community);
    expect(salesLead).not.toBeNull();

    const { salesContact } = salesLead;
    expect(salesContact).not.toBeNull()

    expect(salesContact.firstName).toEqual('James')
    expect(salesContact.lastName).toEqual('Monroe')
    expect(salesLead.inquirerType).toEqual('PROSP')
})

test('creates prospect request based upon user selecting "Parent"', () => {

})