import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useFormikContext } from 'formik';
import { CommunitySelect } from './components/CommunitySelect';
import { getFollowupActions } from '../../services/dropdowns';
import { defaultVisitNotes } from './defaultVisitNotes';
import fetchCommunities from '../../services/community-services/fetch-communities';

export const Communities = (props) => {
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    status: { readOnly },
    values: { communities },
  } = useFormikContext();
  const [ communityList, setCommunityList ] = useState([]);
  const [ followupActions, setFollowupActions ] = useState([]);
  const { allowAddCommunities, onAddCommunity, onRemoveCommunity } = props;

  const followupOptions = useMemo(() => {
    return followupActions.map(optn => <option key={optn.value} value={optn.value}>{optn.text}</option>);
  }, [followupActions]);

  const onFollowupActionChange = useCallback((action, index) => {
    const { note, followUpAction} = communities[index];

    if (!note || (note === defaultVisitNotes[followUpAction])) {
      setFieldValue(`communities[${index}].note`, defaultVisitNotes[action] || '');
    }

    setFieldValue(`communities[${index}].followUpAction`, action);
  }, [communities, setFieldValue]);

  const onCommunityChange = useCallback((community, index) => {
    setFieldValue(`communities[${index}].communityId`, community);
  }, [setFieldValue]);

  const handleVisitChanges = useCallback((value, index, name) => {
    setFieldValue(`communities[${index}].${name}`, value);
  }, [setFieldValue]);

  const onFollowupDateChange = useCallback((date, index) => {
    setFieldValue(`communities[${index}].followupDate`, date);
  }, [setFieldValue]);

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
      <Button color="primary" size="sm" aria-pressed="false"
        disabled={!allowAddCommunities || readOnly}
        onClick={onAddCommunity}>
          Add Community
      </Button>
      {communities.map((community, index) => (
        <CommunitySelect
          key={community.uuid}
          index={index}
          community={community}
          handleChange={handleChange}
          handleBlur={handleBlur}
          onFollowupActionChange={onFollowupActionChange}
          onCommunityChange={onCommunityChange}
          onFollowupDateChange={onFollowupDateChange}
          handleVisitChanges={handleVisitChanges}
          onRemove={() => onRemoveCommunity(community)}
          isReadOnly={readOnly}
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