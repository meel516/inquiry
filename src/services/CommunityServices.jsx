import uuid from "uuid";

const URL_COMMUNITIES = `${process.env.REACT_APP_SALES_SERVICES_URL}/CommunitySearch/service`;

var Community = function(index) {

};

export function fetchCommunities() {
    const endpoint = window.encodeURI(`${URL_COMMUNITIES}/searchByAppAndUser`)
    //const endpoint = window.encodeURI(`http://localhost/CommunitySearch/service/searchByAppAndUser`)
    console.log('endpoint is: ' + endpoint);

    const commRequest = {
        "communitySearchText": "",
        "appShortName": "SIMS",
        "userName": "mmatthiessen"
    }

    return fetch(endpoint, {
      method: 'POST', mode: 'cors', cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commRequest)
    }).then((res) => res.json());
}

export function createCommunity() {
  var community = new Community(uuid.v4());

  return community;
}
