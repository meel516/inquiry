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

    componentDidMount() {
        this.checkAuthentication(this.loadCommunities);
    }

    loadCommunities = (userInfo) => {
        const communityService = new CommunityService();
        communityService.fetchCommunities(userInfo.preferred_username)
            .then((data) => {
                //console.log(data);
                var communities = data.map((com) => {
                    return { value: com.id, label: com.buildingName }
                });
                //console.log(communities);
                this.setState({ communityList: communities });
            })
            .catch((err) => console.error("Error", err));
    }

    handleCommunityChange = (optn) => {
        const { index, setFieldValue } = this.props;
        setFieldValue(`communities[${index}].communityId`, optn.value);
    }

    render() {
        return (
            <FormGroup>
                <Label for="communityList" className="label-format">Community</Label>
                <Select
                    name="communityId"
                    onChange={this.handleCommunityChange}
                    options={this.state.communityList}
                />
            </FormGroup>
        )
    }
});