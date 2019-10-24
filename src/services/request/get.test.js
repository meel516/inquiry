import get from './get'
import createFetch from './create-fetch'

jest.mock('./create-fetch')

describe('request.get Service', () => {
    beforeEach(() => {
        createFetch.mockClear();
    })
    test('should call createFetch properly', () => {
        createFetch.mockReturnValue('FETCH_OBJECT')
        const result = get('URL')
        expect(createFetch).toHaveBeenCalledWith('URL', 'GET')
        expect(result).toEqual('FETCH_OBJECT')
    })
})