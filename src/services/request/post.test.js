import post from './post'
import createFetch from './create-fetch'

jest.mock('./create-fetch')

describe('request.post Service', () => {
    beforeEach(() => {
        createFetch.mockClear();
    })
    test('should call fetch properly', () => {
        createFetch.mockReturnValue('FETCH_OBJECT')
        const mockSuccessResponse = {}
        const mockJsonPromise = Promise.resolve(mockSuccessResponse)
        const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise })
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
        post('URL', 'PAYLOAD').then(() => {
            expect(createFetch).toHaveBeenCalledWith('POST', 'PAYLOAD')
            expect(global.fetch).toHaveBeenCalledWith('URL', 'FETCH_OBJECT')
        })
    })
})