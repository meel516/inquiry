
import { ObjectMappingService } from '../Types'
import { CommunityService } from '../CommunityServices'

describe('prospect request mappings', () => {

    test('creates prospect request with no prospect/lead information', () => {
        const prospect = ObjectMappingService.createProspectRequest(null, null);
    
        expect(prospect).toEqual(undefined);
    
    });
    
    test('creates prospect request based upon self', () => {
        const lead = ObjectMappingService.createEmptyLead();
        const community = CommunityService.createCommunity();
        const user = CommunityService.createEmptyUser();

        const {prospect, influencer} = lead;
        lead.callingFor = 'Myself'
        influencer.firstName = 'James'
        influencer.lastName = 'Monroe'
    
        const salesLead = ObjectMappingService.createProspectRequest(lead, community, user);
        expect(salesLead).not.toBeNull();
    
        const { salesContact } = salesLead;
        expect(salesContact).not.toBeNull()
    
        expect(salesContact.firstName).toEqual('James')
        expect(salesContact.lastName).toEqual('Monroe')
        expect(salesLead.inquirerType).toEqual('PROSP')
    })
    
    test('creates prospect request based upon user selecting "Parent"', () => {
    
    })

    test('validate field length on influencer firstname_HAPPYPATH', () => {
        const lead = ObjectMappingService.createEmptyLead();
        lead.influencer.firstName = "12345678901234567890123456789012345678901234567890"

        expect(lead.influencer.firstName.length <= 50).toBe(true);
    })

    test('validate field length on influencer firstname_FAILURE', () => {
        const lead = ObjectMappingService.createEmptyLead();
        lead.influencer.firstName = "12345678901234567890123456789012345678901234567890abcdef"

        expect(lead.influencer.firstName.length <= 50).toBe(false);
    })

})
