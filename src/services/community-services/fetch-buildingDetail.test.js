import * as request from '../request'
import { fetchBuildingDetailUrl } from '../../constants/url-generator';
import fetchBuildingDetail from './fetch-buildingDetail';

jest.mock('../request', () => ({ post: jest.fn(), jsonResponse: jest.fn() }))
jest.mock('../../constants/url-generator', () => ({ fetchBuildingDetailUrl: jest.fn() }))

describe('communityServices.fetchBuildingDetail Service', () => {
    beforeEach(() => {
        fetchBuildingDetailUrl.mockClear();
        request.post.mockResolvedValue({ json: () => 'test' });
        request.jsonResponse.mockClear();
    })
    test('should properly call post', () => {
        fetchBuildingDetailUrl.mockReturnValue('URL');
        const buildingId = 1234;
        fetchBuildingDetail(buildingId).then(() => {
            expect(request.post).toHaveBeenCalledWith(`URL`)
            expect(request.jsonResponse).toHaveBeenCalled();
        })
        
    })
    test('should output properly', () => {
        request.jsonResponse.mockReturnValue('RESPONSE');
        fetchBuildingDetail().then((response) => {
            expect(response).toEqual('RESPONSE');
        });
    });
});