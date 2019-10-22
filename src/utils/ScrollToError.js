import React from "react";

class ScrollToError extends React.Component {

    constructor(props) {
        super(props);
        const influencerFirstName = React.createRef();
        const influencerLastName = React.createRef();
        const prospectFirstName = React.createRef();
        const prospectLastName = React.createRef();

        const errorRefs = {
            influencerFirstName, influencerLastName
        }

        const refsMap = {}

        // refsMap['influencerFirstName'] = 

    }

    // getRef = (errors) => {
    //     if (!errors) return null;
    //     if (errors.influencer) {
    //         if (errors.influencer.firstname) return this.influencerFirstName
    //         if (errors.influencer.lastName) return this.influencerLastName
    //     }

    //     if (errors.prospect) {
    //         if (errors.prospect.firstname) return this.prospectFirstName
    //         if (errors.prospect.lastName) return this.prospectLastName
    //     }
    

    getRefsMap() {
        let refsMap = new Map()
        refsMap.set('influencerFirstName', this.influencerFirstName)
        refsMap.set('influencerLastName', this.influencerLastName)
        refsMap.set('prospectFirstName', this.prospectFirstName)
        refsMap.set('prospectLastName', this.prospectLastName)

        return refsMap
    }

    export  { getRefsMap }

}

