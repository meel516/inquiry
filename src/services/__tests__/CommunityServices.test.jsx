
import { CommunityService } from '../CommunityServices';

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
