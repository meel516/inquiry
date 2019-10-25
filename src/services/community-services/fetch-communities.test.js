import * as request from '../request'
import getEndpointUrl from './get-endpoint-url'
import fetchCommunities from './fetch-communities'

jest.mock('../request', () => ({ post: jest.fn() }))
jest.mock('./get-endpoint-url')

describe('communityServices.createCommunity Service', () => {
    beforeEach(() => {
        getEndpointUrl.mockClear()
        request.post.mockResolvedValue({ json: () => 'test' })
    })
    test('should properly call post', async () => {
        getEndpointUrl.mockReturnValue('URL')
        const payload = {
            communitySearchText: '',
            appShortName: 'SIMS',
            username: 'foo'
        }
        await fetchCommunities(payload.username)
        expect(request.post).toHaveBeenCalledWith(`URL/searchByAppAndUser`, payload)
    })
    test('should return json', async () => {
        const response = await fetchCommunities('')
        expect(response).toEqual('test')
    })
})