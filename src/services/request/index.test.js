import * as request from './index'

describe('request Service', () => {
    test('should contain all pieces', () => {
        expect(typeof request['post']).toEqual('function')
        expect(typeof request['get']).toEqual('function')
        expect(typeof request['jsonResponse']).toEqual('function')
        expect(Object.keys(request).length).toEqual(4)
    })
})