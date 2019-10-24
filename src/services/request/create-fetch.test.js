import getHeaders from './get-headers'
import createFetch from './create-fetch'

jest.mock('./get-headers')

describe('request.createFetch Service', () => {
    const mockSuccessResponse = {}
    const mockJsonPromise = Promise.resolve(mockSuccessResponse)
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise })
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    jest.spyOn(global, 'encodeURI').mockImplementation(() => 'ENCODED_URI')
    beforeEach(() => {
        getHeaders.mockClear();
    })
    test('should construct fetch with payload', async () => {
        const url = 'myUrl'
        const payload = {
            test: 'tester'
        }
        const fetchParams = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: { foo: 'bar' },
            body: JSON.stringify(payload)
        }
        getHeaders.mockReturnValue(fetchParams.headers)
        await createFetch(url, fetchParams.method, payload)
        expect(getHeaders).toHaveBeenCalled()
        expect(global.fetch).toHaveBeenCalledWith('ENCODED_URI', fetchParams)
        expect(global.encodeURI).toHaveBeenCalledWith(url)
    })
    test('should construct fetch without payload', async () => {
        const url = 'myUrl'
        const payload = {
            test: 'tester'
        }
        const fetchParams = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: { foo: 'bar' }
        }
        getHeaders.mockReturnValue(fetchParams.headers)
        await createFetch('myUrl', fetchParams.method)

        expect(getHeaders).toHaveBeenCalled()
        expect(global.fetch).toHaveBeenCalledWith('ENCODED_URI', fetchParams)
        expect(global.encodeURI).toHaveBeenCalledWith(url)
    })
})