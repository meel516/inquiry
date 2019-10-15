import React from 'react'
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { withAuth } from '@okta/okta-react';

import { checkAuthentication } from '../auth/checkAuth';
import { CommunityService } from '../services/CommunityServices'

export default withAuth(class CommunityLookup extends React.Component {
    state = {
        communityList: [],
    }
    checkAuthentication = checkAuthentication.bind(this)
    communityService = new CommunityService();

    componentDidMount() {
        this.checkAuthentication(this.loadCommunities);
    }

    loadCommunities = (userInfo) => {
        this.communityService.fetchCommunities(userInfo.preferred_username)
            .then((data) => {
                var communities = data.map((com) => {
                    return { value: com.id, label: com.buildingName }
                });
                this.setState({ communityList: communities });
            })
            .catch((err) => console.error("Error", err));
    }

    handleCommunityChange = (optn) => {
        const { index, setFieldValue } = this.props;
        setFieldValue(`communities[${index}].communityId`, optn.value);
    }

    render() {
        const { community } = this.props || {};
        let defaultSelected = {}
        if (community) {
            defaultSelected = { value: community.communityId, label: community.name }
        }

        return (
            <FormGroup>
                <Label for="communityList" className="label-format">Community</Label>
                <Select
                    name="communityId"
                    onChange={this.handleCommunityChange}
                    options={this.state.communityList}
                    defaultValue={defaultSelected}
                />
            </FormGroup>
        )
    }
});