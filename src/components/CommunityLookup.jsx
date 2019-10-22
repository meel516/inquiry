import React from 'react'
import { FormGroup, Label } from 'reactstrap';
import { withAuth } from '@okta/okta-react';
import Select from 'react-select';
import PropTypes from 'prop-types'

import { checkAuthentication } from '../auth/checkAuth';
import { CommunityService } from '../services/CommunityServices'

export class CommunityLookup extends React.Component {
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
                    isDisabled={this.props.isReadOnly}
                />
            </FormGroup>
        )
    }
}

CommunityLookup.propTypes = {
  index: PropTypes.number.isRequired,

  setFieldValue: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

CommunityLookup.defaultProps = {
    isReadOnly: false
}


export default withAuth(CommunityLookup);