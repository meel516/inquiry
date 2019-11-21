import React from 'react';
import PropTypes from 'prop-types';
import { Influencer } from '../../../components/persons';
import { StyledFormSection } from './styled';

export const InfluencerSection = React.memo(({ influencer, isReadOnly, updateLead, isLeadFromContactCenterBuilding, isLocked }) => (
    <StyledFormSection id='contactInfo'>
        <Influencer
            basePath='lead'
            contact={influencer}
            isReadOnly={isReadOnly}
            updateLead={updateLead}
            isLeadFromContactCenterBuilding={isLeadFromContactCenterBuilding}
            locked={isLocked}
        />
    </StyledFormSection>
))

InfluencerSection.displayName = 'InfluencerSection';
InfluencerSection.propTypes = {
    influencer: PropTypes.object.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
    updateLead: PropTypes.func.isRequired,
    isLeadFromContactCenterBuilding: PropTypes.func.isRequired,
    isLocked: PropTypes.bool.isRequired,
}