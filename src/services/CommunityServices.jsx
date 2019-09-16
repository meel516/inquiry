import uuid from "uuid";

const URL_COMMUNITIES = `${process.env.REACT_APP_SALES_SERVICES_URL}/CommunitySearch/service`;

function Community(index) {
  this.uuid = index;
  this.communityId = 0;
  this.freeMeal = 0;  // Blank Option
  this.followupDate = new Date();
};

export function freeMealListing() {
  return [
    { value: 0, label: ""},
    { value: 1, label: "No" },
    { value: 2, label: "Lunch" },
    { value: 3, label: "Dinner" },
  ]
}

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

// creates an empty community object
export function createCommunity() {
  var community = new Community(uuid.v4());

  return community;
}
