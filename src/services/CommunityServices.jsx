import uuid from "uuid";
import moment from 'moment';

const URL_COMMUNITIES = `${process.env.REACT_APP_SALES_SERVICES_URL}/CommunitySearch/service`;

function Community(index) {
  this.uuid = index;
  this.communityId = 0;
  this.freeMeal = 0;  // Blank Option
  var formattedFollowUpDate = new Date();
  formattedFollowUpDate.toJSON = function(){ return moment(this).format("YYYY-MM-DDTHH:mm:ss.SSSZZ"); };
  this.followupDate = formattedFollowUpDate;
};

class CommunityService {

  static freeMealListing() {
    return [
      { value: 0, label: "" },
      { value: 1, label: "No" },
      { value: 2, label: "Lunch" },
      { value: 3, label: "Dinner" },
    ]
  }

  static getFreeMealItem(item) {
    const freeMeals = this.freeMealListing();
    let freeMeal = null;
    if (item) {
      freeMeal = freeMeals.find((freemeal)=> {
        return (freemeal.value == item)
      })
    }
    return (freeMeal) ? freeMeal : null;
  }

  async fetchCommunities(username) {
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

  static containContactCenter(communities) {
    if (communities == null || communities.length === 0) {
      return false
    }
    return communities.includes((community) => {
      return CommunityService.isContactCenter(community)
    });
  }

  // creates an empty community object
  static createCommunity() {
    var community = new Community(uuid.v4());

    return community;
  }

  static isContactCenter(community) {
    return (community && community.buildingId === 225707)
  }

  static convertToISODate(dateStr) {
    return moment(dateStr).format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
  }

}

export {
  CommunityService,
}