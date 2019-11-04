import jsonResponse from './json-response'

describe('request.jsonResponse Service', () => {
    test('should call json() properly', () => {
        const json = jest.fn()
        const response = { json }
        json.mockReturnValue('foo')
        const result = jsonResponse(response)
        expect(result).toEqual('foo')
        expect(json).toHaveBeenCalled()
    })
})