
import { TestUtils } from '../../utils/test-utils'
import { ObjectMappingService } from '../Types'
import { DropDownService, DuplicationService, SalesAPIService } from '../SalesServices';
import createCommunity from '../community-services/create-community'

describe('deduplication checks logic', () => {

    test('test empty contact if duplicate should be run - no', () => {
        const contact = ObjectMappingService.createEmptyContact();
        expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
    });

    test('test first name only dup check', () => {
        const contact = ObjectMappingService.createEmptyContact();
        TestUtils.addFirstName(contact)
        expect(contact.firstName).toEqual('James')
        expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
    })

    test('test last name only dup check', () => {
        const contact = ObjectMappingService.createEmptyContact();
        TestUtils.addLastName(contact)
        expect(contact.lastName).toEqual('Dune')
        expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
    })

    test('test phone only no dup check', () => {
        const contact = ObjectMappingService.createEmptyContact();
        TestUtils.addPhoneNumber(contact)
        expect(contact.phone.number).toEqual('(234) 345-8374')
        expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
    })

    test('test first/last name no dup check', () => {
        const contact = ObjectMappingService.createEmptyContact()
        TestUtils.addFirstName(contact)
        TestUtils.verifyFirstName(contact);
        TestUtils.addLastName(contact)
        expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy();
    })

    test('test first/last phone but no phone type, dup check', () => {
        const contact = ObjectMappingService.createEmptyContact();
        TestUtils.verifyFirstName(TestUtils.addFirstName(contact))
        TestUtils.verifyLastName(TestUtils.addLastName(contact))
        TestUtils.verifyPhoneNumber(TestUtils.addPhoneNumber(contact))
        expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy()
    })

    test('test dup check true with name/phone combo', () => {
        const contact = ObjectMappingService.createEmptyContact();
        TestUtils.verifyFirstName(TestUtils.addFirstName(contact))
        TestUtils.verifyLastName(TestUtils.addLastName(contact))
        TestUtils.verifyPhoneNumber(TestUtils.addPhoneNumber(contact))
        TestUtils.log(TestUtils.verifyPhoneType(TestUtils.addPhoneType(contact)))
        expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeTruthy()
    })

    test('test email no dup check', () => {
        const contact = ObjectMappingService.createEmptyContact();
        TestUtils.verifyEmail(TestUtils.addEmailAddress(contact));
        expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeFalsy()
    })

    test('test dup check true with name/email combo', () => {
        const contact = ObjectMappingService.createEmptyContact();
        TestUtils.verifyEmail(TestUtils.addEmailAddress(contact));
        TestUtils.verifyFirstName(TestUtils.addFirstName(contact))
        TestUtils.verifyLastName(TestUtils.addLastName(contact))
        expect(DuplicationService.shouldRunDuplicateCheck(contact)).toBeTruthy()
    })

})

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

            expect(lead.currentSituation).toEqual(1)
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

            const salesLead = salesService.submitProspect(lead, community);

            expect(salesLead).not.toBeNull();
            expect(salesLead.leadId).toEqual();
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
    const salesServiceApi = new SalesAPIService();

    const successful = {objectId: 123, message: 'Successful'}
    const failure = {message: 'Failure'}
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

        test('test submission of add community request', async () => {
            const mockJsonPromise = Promise.resolve(successful)
            const mockFetchPromise = Promise.resolve({
                json: () => mockJsonPromise,
                status: 201,
            })
            jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    
            // set lead id as if it was already processed
            lead.leadId = 1
    
            const request = ObjectMappingService.createAddCommunityRequest(lead, communities, user);
            salesServiceApi.sendAddCommunityRequest(request);
    
            expect(global.fetch).toHaveBeenCalledTimes(1);
    
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
                await salesServiceApi.sendAddCommunityRequest(request)
            }
            catch(err) {
                error = true
            }
    
            expect(global.fetch).toHaveBeenCalledTimes(1)
            expect(error).toBeTruthy()
    
        })

        test('test failure ping testing server', async () => {

        })
    
    })

})


describe('submission of inquiry form', () => {

    test('test successful processing of the entire submission process', () => {

    })

})
