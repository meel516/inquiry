import service, { createContactDuplicationRequest } from './find-duplicates'
import { createDuplicateSearchUrl } from '../../constants/url-generator'
import * as request from '../request'
import stripPhoneFormatting from './strip-phone-formatting'

jest.mock('../../constants/url-generator', () => ({ createDuplicateSearchUrl: jest.fn() }))
jest.mock('./strip-phone-formatting')
jest.mock('../request', () => ({ post: jest.fn(), jsonResponse: jest.fn() }))

describe('salesServices.findDuplicates', () => {
    beforeEach(() => {
        createDuplicateSearchUrl.mockClear()
        request.post.mockClear()
        request.jsonResponse.mockClear()
        request.post.mockResolvedValue({})
        stripPhoneFormatting.mockClear()
    })
    describe('createContactDuplicationRequest', () => {
        beforeEach(() => {
            stripPhoneFormatting.mockClear()
            stripPhoneFormatting.mockReturnValue('UNFORMATTED_PHONE')
        })
        test('should output with email', () => {
            expect(createContactDuplicationRequest({ email: 'EMAIL',  })).toEqual({
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                email: 'EMAIL',
                prospectFirstName: '',
                prospectLastName: '',
                phone1: 'UNFORMATTED_PHONE',
                phoneType: '',
            })
        })
        test('should output without email', () => {
            expect(createContactDuplicationRequest({})).toEqual({
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                email: '',
                prospectFirstName: '',
                prospectLastName: '',
                phone1: 'UNFORMATTED_PHONE',
                phoneType: '',
            })
        })
        test('should output without contact', () => {
            expect(createContactDuplicationRequest()).toEqual({
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                email: '',
                prospectFirstName: '',
                prospectLastName: '',
                phone1: 'UNFORMATTED_PHONE',
                phoneType: '',
            })
        })
    })
    describe('service', () => {
        test('should call dependencies', () => {
            service().then(() => {
                expect(request.post).toHaveBeenCalled()
                expect(request.jsonResponse).toHaveBeenCalled()
            })
        })
        test('should output properly', () => {
            request.jsonResponse.mockReturnValue('RESPONSE')
            service().then((response) => {
                expect(response).toEqual('RESPONSE')
            })
        })
        test('should err properly', () => {
            request.post.mockRejectedValue('ERROR')
            service().catch((response) => {
                expect(response).toEqual(new Error('Error Performing Duplicate Search'))
            })
        })
    })
})
