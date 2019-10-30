import React from 'react'
import { FormGroup, Label } from 'reactstrap';
import { withAuth } from '@okta/okta-react';
import Select from 'react-select';
import PropTypes from 'prop-types'

import { checkAuthentication } from '../auth/checkAuth';
import fetchCommunities from '../services/community-services/fetch-communities'

export class CommunityLookup extends React.Component {
    state = {
        communityList: [],
    }
    checkAuthentication = checkAuthentication.bind(this)

    componentDidMount() {
        this.checkAuthentication(this.loadCommunities);
    }

    loadCommunities = (userInfo) => {
        fetchCommunities(userInfo.preferred_username)
            .then((data) => {
                var communities = data.map((com) => {
                    return { value: com.id, label: (com.buildingName + " - " + com.accountingCode) }
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