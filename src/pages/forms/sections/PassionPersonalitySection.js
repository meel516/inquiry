import React from 'react';
import PropTypes from 'prop-types';
import { Note } from '../../../components/form-items';
import { Communities } from '../../../components/communities';
import { StyledFormSection } from './styled';

export const PassionPersonalitySection = React.memo(({ username }) => (
    <StyledFormSection id='passionPersonality'>
        <Note name='lead.notes.passionsPersonality' label="Passions &amp; Personality" />
        <Communities username={username} />
    </StyledFormSection>
))

PassionPersonalitySection.displayName = 'PassionPersonalitySection';
PassionPersonalitySection.propTypes = {
    username: PropTypes.string.isRequired,
}