import * as service from './index'

describe('communityServices Service', () => {
    test('should contain all pieces', () => {
        expect(typeof service['containContactCenter']).toEqual('function')
        expect(typeof service['createCommunity']).toEqual('function')
        expect(typeof service['fetchCommunities']).toEqual('function')
        expect(typeof service['getFreeMealItem']).toEqual('function')
        expect(typeof service['isContactCenter']).toEqual('function')
        expect(Object.keys(service).length).toEqual(5)
    })
})