import React, { Fragment, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useFormikContext } from 'formik';
import { CommunitySelect } from './components/CommunitySelect';
import { getFollowupActions } from '../../services/dropdowns';
import fetchCommunities from '../../services/community-services/fetch-communities';

export const Communities = (props) => {
  const {
    status: { readOnly },
    values: { communities },
  } = useFormikContext();
  const [ communityList, setCommunityList ] = useState([]);
  const [ followupActions, setFollowupActions ] = useState([]);
  const { allowAddCommunities, onAddCommunity, onRemoveCommunity } = props;

  const followupOptions = useMemo(() => {
    return followupActions.map(optn => <option key={optn.value} value={optn.value}>{optn.text}</option>);
  }, [followupActions]);

  useEffect(() => {
    fetchCommunities(props.username).then(comms => {
      const mapped = comms.map(com => ({ value: com.id, label: `${com.buildingName} - ${com.accountingCode}` }));
      setCommunityList(mapped);
    })
  }, [props.username]);

  useEffect(() => {
    getFollowupActions().then(data => setFollowupActions(data));
  }, []);

  return (
    <Fragment>
      <Button color="primary" size="sm" aria-pressed="false" disabled={!allowAddCommunities || readOnly} onClick={onAddCommunity}>
          Add Community
      </Button>
      {communities.map((community, index) => (
        <CommunitySelect
          key={community.uuid}
          index={index}
          onRemove={() => onRemoveCommunity(community)}
          communityList={communityList}
          followupOptions={followupOptions}
        />
      ))}
    </Fragment>
  );
}

Communities.propTypes = {
  allowAddCommunities: PropTypes.bool,
  onAddCommunity: PropTypes.func,
  onRemoveCommunity: PropTypes.func,
}