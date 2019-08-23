import axios from 'axios'
import uuid from "uuid";

const URL_COMMUNITIES = 'http://unit-api.brookdale.com/bu-master';

var Community = function(index) {

};

export function fetchCommunities() {
    const endpoint = window.encodeURI(`${URL_COMMUNITIES}/api/communities`)

    // return axios.get(endpoint, {
    //   headers: {
    //     client_id: 'f096568719ac4e5d8e27df8982a955bd',
    //     client_secret: 'e360e263b5344781891E822F603E1C42'
    //   }
    // });

    // return fetch(endpoint, { mode: 'cors', cache: 'no-cache', })
    //   .then((res) => res.json());
    return fetch(endpoint, {
      method: 'GET', mode: 'cors', cache: 'no-cache',
      headers: {
        client_id: 'f096568719ac4e5d8e27df8982a955bd',
        client_secret: 'e360e263b5344781891E822F603E1C42'
      }
    }).then((res) => res.json());
      // .then((res) => response.json())
      // .then((data) => {
      //   if(!data) {
      //     throw new Error()
      //   }
      //   return data;
      // })
      // .catch((err) => console.error("Error:", err));
}

export function createCommunity() {
  var community = new Community(uuid.v4());

  return community;
}
