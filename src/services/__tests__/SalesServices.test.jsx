
import { TestUtils } from '../../utils/test-utils'
import { ObjectMappingService } from '../Types'
import { DropDownService, DuplicationService, SalesAPIService } from '../SalesServices';
import { CommunityService } from '../CommunityServices';

// describe('testing api', () => {
//     beforeEach(() => {
//       fetch.resetMocks()
//     })

//     //test('fetch')
// })

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

    beforeEach(() => {
        global.fetch.resetMocks()
        global.fetch = jest.fn().mockImplementation(() => {
            // return new Promise
            // console.log(url)
        });
    })

    describe('test happy path submission of prospect (self)', () => {

        test('submit lead/community as prospect', async () => {
            const body = JSON.stringify({ objectId: 123, message: 'Successful'});
            const response = new Response(body, {status: 201, statusText: 'CREATED', headers: new Headers({
                'Content-Type': 'application/json'
            })})
            fetch.mockReturnValue(Promise.resolve(response));
            const lead = ObjectMappingService.createEmptyLead();

            const community = CommunityService.createCommunity();

            const salesLead = salesService.submitProspect(lead, community);

            expect(salesLead).not.toBeNull();
            expect(salesLead).toEqual();
        });
    })

    describe('test happy path submission of influencer ()', () => {

        test('submit influencer ')
    })
})
