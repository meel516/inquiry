
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

  test('test fetching free meal array from service', () => {
    const freeMeals = CommunityService.freeMealListing()
    expect(freeMeals).not.toBeNull()
    expect(freeMeals.length).toEqual(4)
  })

  test('test fetching free meal that is out of bounce', () => {
    const freeMealSelected = CommunityService.getFreeMealItem('Bird')
    expect(freeMealSelected).toBeNull()
  })

  test('test fetching the free meal label from the service', () => {
    const freeMeals = CommunityService.freeMealListing()
    const freeMealItem = freeMeals[1]
    expect(freeMealItem).not.toBeNull()

    const freeMealSelected = CommunityService.getFreeMealItem('No')
    expect(freeMealSelected).not.toBeNull()

    expect(freeMealSelected.value).toEqual(freeMealItem.value)
    expect(freeMealSelected.label).toEqual(freeMealItem.label)
  })

})