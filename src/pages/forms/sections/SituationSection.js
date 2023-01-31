import React from 'react';
import { Row, Col } from 'reactstrap';
import { Note, CareType } from '../../../components/form-items';
import { Prospect } from '../../../components/persons';
import { ADLNeeds } from '../../../components/checkbox-groups';
import { AdditionalCareElements } from '../../../components/additional-care-elements';
import { CurrentSituation } from '../../../components/additional-care-elements/components/CurrentSituation';
import { StyledFormSection } from './styled';
import PropTypes from 'prop-types';

export const SituationSection = ({influencer, updateProspect, isLeadFromContactCenterBuilding, locked, formikErrors}) => (
    <StyledFormSection id='situation'>
        <Note name='lead.notes.situation' label="Situation" rows={6} />
        <Row>
            <Col>
                <ADLNeeds basePath='lead.adlNeeds'  formikErrors={formikErrors}/>
            </Col>
        </Row>
        <AdditionalCareElements basePath='lead'/>
        <CurrentSituation basePath='lead' />
        <Prospect basePath='lead'
                  contact={influencer}
                  updateProspect={updateProspect}
                  isLeadFromContactCenterBuilding={isLeadFromContactCenterBuilding}
                  locked={locked}/>
        <CareType basePath='lead' />
    </StyledFormSection>
)

SituationSection.displayName = 'SituationSection';

SituationSection.propTypes = {
    formikErrors:    PropTypes.object,
};