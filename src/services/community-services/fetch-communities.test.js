import * as request from '../request'
import { createCommunitiesFetchUrl } from '../../constants/url-generator'
import fetchCommunities from './fetch-communities'

jest.mock('../request', () => ({ post: jest.fn() }))
//  TODO: Migrate the previous line to the following after MR # 76
//  jest.mock('../request', () => ({ post: jest.fn(), jsonResponse: jest.fn() }))
jest.mock('../../constants/url-generator', () => ({ createCommunitiesFetchUrl: jest.fn() }))

describe('communityServices.createCommunity Service', () => {
    beforeEach(() => {
        createCommunitiesFetchUrl.mockClear()
        request.post.mockResolvedValue({ json: () => 'test' })
        //  TODO: Add following after MR # 76
        //  request.jsonResponse.mockClear()
    })
    test('should properly call post', async () => {
        createCommunitiesFetchUrl.mockReturnValue('URL')
        const payload = {
            communitySearchText: '',
            appShortName: 'SIMS',
            username: 'foo'
        }
        await fetchCommunities(payload.username)
        expect(request.post).toHaveBeenCalledWith(`URL`, payload)
        //  TODO: Add following after MR # 76
        //  expect(request.jsonResponse).toHaveBeenCalled()
    })
    //  TODO: Remove following after MR # 76
    test('should return json', async () => {
        const response = await fetchCommunities('')
        expect(response).toEqual('test')
    })
    //  TODO: Add following after MR # 76
    /*
    test('should output properly', () => {
        request.jsonResponse.mockReturnValue('RESPONSE')
        service().then((response) => {
            expect(response).toEqual('RESPONSE')
        })
    })
    */
})