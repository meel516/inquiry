import service from './index'
import { createEloquaCdoUrl } from '../../../constants/url-generator'
import createPayload from './create-payload'
import * as request from '../../request'

jest.mock('../../../constants/url-generator', () => ({ createEloquaCdoUrl: jest.fn() }))
jest.mock('./create-payload')
jest.mock('../../request', () => ({ post: jest.fn(), jsonResponse: jest.fn() }))

describe('eloqua.createCdo Service', () => {
    beforeEach(() => {
        createEloquaCdoUrl.mockClear()
        request.post.mockClear()
        request.jsonResponse.mockClear()
        request.post.mockResolvedValue({})
        createPayload.mockClear()
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
                expect(response).toEqual('ERROR')
            })
        })
    })
})
