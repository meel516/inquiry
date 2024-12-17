import {v1 as uuid} from "uuid"; 

export default id => ({
    uuid: id || uuid(),
    communityId: 0,
    freeMeal: null,
    followupDate: null,
    followUpAction: null,
    spotlightDiscussed: false
})