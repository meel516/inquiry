import * as request from '../request'
import { createCommunitiesFetchUrl } from '../../constants/url-generator'
import fetchCommunities from './fetch-communities'

jest.mock('../request', () => ({ post: jest.fn(), jsonResponse: jest.fn() }))
jest.mock('../../constants/url-generator', () => ({ createCommunitiesFetchUrl: jest.fn() }))

describe('communityServices.fetchCommunities Service', () => {
    beforeEach(() => {
        createCommunitiesFetchUrl.mockClear()
        request.post.mockResolvedValue({ json: () => 'test' })
        request.jsonResponse.mockClear()
    })
    test('should properly call post', () => {
        createCommunitiesFetchUrl.mockReturnValue('URL')
        const payload = {
            communitySearchText: '',
            appShortName: 'SIMS',
            userName: 'foo'
        }
        fetchCommunities(payload.userName).then(() => {
            expect(request.post).toHaveBeenCalledWith(`URL`, payload)
            expect(request.jsonResponse).toHaveBeenCalled()
        })
        
    })
    test('should output properly', () => {
        request.jsonResponse.mockReturnValue('RESPONSE')
        fetchCommunities().then((response) => {
            expect(response).toEqual('RESPONSE')
        })
    })
})