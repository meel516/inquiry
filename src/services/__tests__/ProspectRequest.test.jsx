import { TestUtils } from '../../utils/test-utils'
import { ObjectMappingService } from '../Types'
import createCommunity from '../community-services/create-community'

describe.skip('prospect request mappings', () => {

    test('creates prospect request with no prospect/lead information', () => {
        const prospect = ObjectMappingService.createProspectRequest(null, null);
    
        expect(prospect).toEqual(undefined);
    
    });
    
    test('creates prospect request based upon self', () => {
        const lead = ObjectMappingService.createEmptyLead();
        const community = createCommunity();
        const user = TestUtils.createEmptyUser();

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

})
