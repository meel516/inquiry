import React, { Fragment, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FieldArray } from 'formik';
import { CommunitySelect } from './components/CommunitySelect';
import { getFollowupActions } from '../../services/dropdowns';
import fetchCommunities from '../../services/community-services/fetch-communities';
import { createCommunity } from '../../services/community-services';
import { StyledErrorMessage } from '../../styled';
import { StyledButtonWrapper } from './styled';

const MAX_COMMUNITIES = 5;

export const Communities = ({ username, requiredCommunityError }) => {
  const [ communityList, setCommunityList ] = useState([]);
  const [ followupActions, setFollowupActions ] = useState([]);

  const followupOptions = useMemo(() => {
    return followupActions.map(optn => <option key={optn.value} value={optn.value}>{optn.text}</option>);
  }, [followupActions]);

  useEffect(() => {
    fetchCommunities(username).then(comms => {
      const mapped = comms.map(com => ({ value: com.id, label: `${com.buildingName} - ${com.accountingCode}` }));
      setCommunityList(mapped);
    })
  }, [username]);

  useEffect(() => {
    getFollowupActions().then(data => setFollowupActions(data));
  }, []);

  return (
    <FieldArray
      name='communities'
      render={({ push, remove, form }) => {
        const {
          values: { communities },
          status: { readOnly },
          validateForm,
        } = form;
        const addDisabled = communities.length === MAX_COMMUNITIES || readOnly;
        const onAdd = () => {
          const newCommunity = createCommunity();
          push(newCommunity);
          validateForm({ ...form.values, communities: communities.concat(newCommunity) })
        }
        const onRemove = (i) => () => {
          remove(i);
          // build new communities array and manuall validate because
          // the `remove` array helper does not call validation
          const head = communities.slice(0, i);
          const rest = communities.slice(i+1, communities.length);
          validateForm({ ...form.values, communities: head.concat(rest) });
        }

        return (
          <Fragment>
            <StyledButtonWrapper>
              <Button color="primary" size="sm" aria-pressed="false" disabled={addDisabled} onClick={onAdd}>
                Add Community
              </Button>
              { requiredCommunityError && <StyledErrorMessage>{requiredCommunityError}</StyledErrorMessage> }
            </StyledButtonWrapper>
              {
              communities.map((community, index) => (
                <CommunitySelect
                  key={community.uuid}
                  index={index}
                  onRemove={onRemove(index)}
                  communityList={communityList}
                  followupOptions={followupOptions}
                />
              ))
            }
          </Fragment>
        )}}
    />
  );
}

Communities.propTypes = {
  username: PropTypes.string.isRequired,
}