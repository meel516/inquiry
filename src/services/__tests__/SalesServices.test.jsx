
import { TestUtils } from '../../utils/test-utils'
import { ObjectMappingService } from '../Types'
import { SalesAPIService } from '../SalesServices';
import createCommunity from '../community-services/create-community'

describe('test lead creation', () => {
    describe('test edge cases', () => {
        test('test sales lead is null', () => {
            const lead = ObjectMappingService.createLead(null);
            expect(lead).not.toBeNull()
        })

        test('test sales lead is undefined', () => {
            const lead = ObjectMappingService.createLead(undefined);
            expect(lead).not.toBeNull()
        })
    })

    describe('test field level cases', () => {
        test('verify creation of lead from salesLead', () => {
            const salesLead = TestUtils.createSampleLead('INFLU')
            const lead = ObjectMappingService.createLead(salesLead)

            expect(lead.veteranStatus).toEqual(3)
            expect(lead.leadId).toEqual(6861902)
            expect(lead.leadSource).toEqual(16)
            expect(lead.leadSourceDetail).toEqual(10001)
            expect(lead.leadTypeId).toEqual(4)

        })
    })
})

describe('test submit prospect needs', () => {
    const salesService = new SalesAPIService();

    const successful = {objectId: 123, message: 'Successful'}

    describe('test happy path submission of prospect (self)', () => {

        test('submit lead/community as prospect', async () => {
            const body = JSON.stringify(successful);
            const response = new Response(body, {status: 201, statusText: 'CREATED', headers: new Headers({
                'Content-Type': 'application/json'
            })})
            fetch.mockReturnValue(Promise.resolve(response));
            const lead = ObjectMappingService.createEmptyLead();

            const community = createCommunity();
            try {
                const salesLead = await salesService.submitProspect(lead, community, {});
                expect(salesLead).not.toBeNull();
                expect(salesLead.leadId).toBeTruthy();
            } catch (e) {

            }
            

            
        });
    })

    describe('test happy path submission of influencer ()', () => {

        test('submit influencer to service endpoint verification', async () => {
            const body = JSON.stringify(successful)

        })
    })
})

describe('unit testing javascript dates', () => {

    test('verify UTC with timezone', () => {
        const d = new Date('1995-05-07T14:35:55')

        expect(d.getUTCDate()).toEqual(7)
        expect(d.getFullYear()).toEqual(1995)
        expect(d.getUTCMonth()).toEqual(5-1) // zero based month 0 - Jan

        // TODO: after adding react-momentum to the project write unit tests to verify

    })

})

describe('service send request testing', () => {
    const salesService = new SalesAPIService();

    // payload messages
    const successful = {objectId: 123, message: 'Successful'}
    const failure = {message: 'Failure'}
    const pingSuccess = {message: 'test'}

    let user = TestUtils.createEmptyUser();
    let communities = [];
    let lead = ObjectMappingService.createEmptyLead();

    afterEach(() => {
        communities = [];
        user = TestUtils.createEmptyUser();
        lead = ObjectMappingService.createEmptyLead();

        global.fetch.mockClear();
    });

    describe('happy path scenarios', () => {
        beforeEach(() => {
            const mockJsonPromise = Promise.resolve(successful)
            const mockFetchPromise = Promise.resolve({
                json: () => mockJsonPromise,
                status: 201,
            })
            jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
        })
        test('test submission of add community request', async () => {
            // set lead id as if it was already processed
            lead.leadId = 1
    
            const request = ObjectMappingService.createAddCommunityRequest(lead, communities, user);
            try {
                await salesService.sendAddCommunityRequest(request);
            } catch (e) {

            }
            
    
            expect(global.fetch).toHaveBeenCalled();
    
        })
    
    })

    describe('500 server error scenarios', () => {

        test('test failure submission of add community request', async () => {
            const mockJsonPromise = Promise.reject(failure);
            const mockFetchPromise = Promise.reject({
                json: () => mockJsonPromise,
                status: 500,
            })
            jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    
            let error = false
            try {
                const request = ObjectMappingService.createAddCommunityRequest(lead, communities, user)
                await salesService.sendAddCommunityRequest(request)
            }
            catch(err) {
                error = true
            }
    
            expect(global.fetch).toHaveBeenCalledTimes(1)
            expect(error).toBeTruthy()
    
        })

        test('test failure ping testing server', async () => {
            const mockFetchPromise = Promise.reject({
                json: () => {throw new Error('Server is not responding.')},
                status: 500,
            })
            jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

            let error = null
            try {
                const ret = await salesService.checkServerStatus();
            }
            catch(err) {
                error = err
                expect(global.fetch).toHaveBeenCalledTimes(1)
                expect(error).not.toBeNull()
                expect(error.message).toEqual('Server is not responding.')
            }

            

        })
    
    })

})


describe('submission of Connection Center Application', () => {

    test('test successful processing of the entire submission process', () => {

    })

})
