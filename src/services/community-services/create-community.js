import uuid from 'uuid/v4';

export default id => ({
    uuid: id || uuid(),
    communityId: 0,
    freeMeal: null,
    followupDate: null,
    followUpAction: null,
    spotlightDiscussed: false
})