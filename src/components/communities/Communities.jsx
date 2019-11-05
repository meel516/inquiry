import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useFormikContext } from 'formik';
import { CommunitySelect } from './components/CommunitySelect';
import { defaultVisitNotes } from './defaultVisitNotes';

export const Communities = (props) => {
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    status: { readOnly },
    values: { communities },
  } = useFormikContext();
  const { allowAddCommunities, onAddCommunity, onRemoveCommunity } = props;

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
          {...props}
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