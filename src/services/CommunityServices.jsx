import uuid from "uuid";

const URL_COMMUNITIES = `${process.env.REACT_APP_SALES_SERVICES_URL}/CommunitySearch/service`;

var Community = function(index) {
  this.index = index;
  this.communityId = 0;
  this.freeMeal = 1;  // No
  this.followupDate = new Date();
};

export async function fetchCommunities(username) { 
    const endpoint = window.encodeURI(`${URL_COMMUNITIES}/searchByAppAndUser`)
    console.log(`fetchCommunities username: ${username}`)

    const commRequest = {
        "communitySearchText": "",
        "appShortName": "SIMS",
        "userName": username
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
