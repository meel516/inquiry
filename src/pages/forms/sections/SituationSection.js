import React from 'react';
import { Row, Col } from 'reactstrap';
import { Note, CareType } from '../../../components/form-items';
import { Prospect } from '../../../components/persons';
import { ADLNeeds } from '../../../components/checkbox-groups';
import { AdditionalCareElements } from '../../../components/additional-care-elements';
import { StyledFormSection } from './styled';

export const SituationSection = React.memo(() => (
    <StyledFormSection id='situation'>
        <Note name='lead.notes.situation' label="Situation" rows={6} />
        <Row>
            <Col>
                <ADLNeeds basePath='lead.adlNeeds' />
            </Col>
        </Row>
        <AdditionalCareElements basePath='lead' />
        <Prospect basePath='lead' />
        <CareType basePath='lead' />
    </StyledFormSection>
))

SituationSection.displayName = 'SituationSection';