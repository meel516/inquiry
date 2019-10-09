
import { CommunityService } from '../CommunityServices';

describe.skip('community fetch tests', () => {

  test('fetcing communities via api service', () => {
    const service = new CommunityService()
    return service.fetchCommunities('jtoepfer')
      .then((resp) => {
        const { data } = resp;
        console.log(data)
        expect(data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              bu: '23094'
            })
          ])
        )
        //expect(data).toContainCommunity()
      })
  })

})

describe('test free meals', () => {
  const communityService = new CommunityService();

  test('test fetching free meal array from service', () => {
    const freeMeals = communityService.freeMealListing();
    expect(freeMeals).not.toBeNull();
  })

  test('test fetching the free meal label from the service', () => {

  })

})