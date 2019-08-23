import React from 'react';
import {fetchCommunities} from '../CommunityServices';

// expect.extends({
//   toContainCommunity(received, buId) {
//     console.log(received);
//   }
// })

test('fetcing communities via api service', () => {
  return fetchCommunities()
    .then((resp) => {
      const {data} = resp;
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
