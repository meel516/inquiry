import React, { Fragment, useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useFormikContext } from 'formik';
import { CommunitySelect } from './components/CommunitySelect';
import { getFollowupActions } from '../../services/dropdowns';
import fetchCommunities from '../../services/community-services/fetch-communities';
import { createCommunity } from '../../services/community-services';

const MAX_COMMUNITIES = 5;

export const Communities = (props) => {
  const {
    setFieldValue,
    status: { readOnly },
    values: { communities },
  } = useFormikContext();
  const [ communityList, setCommunityList ] = useState([]);
  const [ followupActions, setFollowupActions ] = useState([]);

  const followupOptions = useMemo(() => {
    return followupActions.map(optn => <option key={optn.value} value={optn.value}>{optn.text}</option>);
  }, [followupActions]);

  const allowAddCommunities = useMemo(() => {
    return communities.length < MAX_COMMUNITIES;
  }, [communities]);

  const addCommunity = useCallback(() => {
    setFieldValue(`communities[${communities.length}]`, createCommunity());
  }, [communities]);

  const removeCommunity = useCallback((uuid) => () => {
    if (uuid) {
      const filteredCommunities = communities.filter(community => community.uuid !== uuid);
      setFieldValue('communities', filteredCommunities);
    }
  }, [communities]);

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
      <Button color="primary" size="sm" aria-pressed="false" disabled={!allowAddCommunities || readOnly} onClick={addCommunity}>
          Add Community
      </Button>
      {communities.map((community, index) => (
        <CommunitySelect
          key={community.uuid}
          index={index}
          onRemove={removeCommunity(community.uuid)}
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