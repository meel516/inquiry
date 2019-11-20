import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Note, CareType } from '../../../components/form-items';
import { Prospect } from '../../../components/persons';
import { ADLNeeds } from '../../../components/checkbox-groups';
import { AdditionalCareElements } from '../../../components/additional-care-elements';
import { StyledFormSection } from './styled';

export const SituationSection = React.memo(({ isReadOnly, isLocked, showProspect }) => (
    <StyledFormSection id='situation'>
        <Note name='lead.notes.situation' label="Situation" rows={6} />
        <Row>
            <Col>
                <ADLNeeds basePath='lead.adlNeeds' isReadOnly={isReadOnly} />
            </Col>
        </Row>
        <AdditionalCareElements basePath='lead' isReadOnly={isReadOnly} />
        <Prospect basePath='lead' showProspect={showProspect} locked={isLocked} />
        <CareType basePath='lead' />
    </StyledFormSection>
))

SituationSection.displayName = 'SituationSection';
SituationSection.propTypes = {
    isReadOnly: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
    showProspect: PropTypes.bool.isRequired,
}