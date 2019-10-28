import post from './post'
import createFetch from './create-fetch'

jest.mock('./create-fetch')

describe('request.post Service', () => {
    beforeEach(() => {
        createFetch.mockClear();
    })
    test('should call createFetch properly', () => {
        createFetch.mockReturnValue('FETCH_OBJECT')
        const result = post('URL', 'PAYLOAD')
        expect(createFetch).toHaveBeenCalledWith('URL', 'POST', 'PAYLOAD')
        expect(result).toEqual('FETCH_OBJECT')
    })
})