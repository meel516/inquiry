import get from './get'
import createFetch from './create-fetch'

jest.mock('./create-fetch')

describe('request.get Service', () => {
    beforeEach(() => {
        createFetch.mockClear();
    })
    test('should call fetch properly', () => {
        createFetch.mockReturnValue('FETCH_OBJECT')
        const mockSuccessResponse = {}
        const mockJsonPromise = Promise.resolve(mockSuccessResponse)
        const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise })
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
        get('URL').then(() => {
            expect(createFetch).toHaveBeenCalledWith('POST')
            expect(global.fetch).toHaveBeenCalledWith('URL', 'FETCH_OBJECT')
        })
    })
})