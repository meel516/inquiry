import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { CallingFor, CallerType, InquiryType, ReasonForCall, ResultOfCall, UMID, VeteranStatus } from '../../../components/form-items';
import { LeadSource } from '../../../components/LeadSource';
import { StyledFormSection } from './styled';
import { useFormikContextWrapper } from '../../../hooks';

export const ResultOfCallSection = React.memo(({ leadSource, lead, leadSourceDetail, resultOfCall, lockCallingFor }) => {
  const { isLocked, isContactCenterBuildingId, editContactSelected } = useFormikContextWrapper();
  const disable2ndLeadSource = lead.leadSource2nd !== undefined && lead.leadSource2nd !== null && lead.leadSource2nd !== 0;

  return (
    <StyledFormSection id='resultOfCall'>
      <Row>
        <Col md="5">
          <ResultOfCall basePath='lead' value={resultOfCall} />
        </Col>
      </Row>
      <Row>
        <Col md="5">
            <CallingFor basePath='lead' locked={(isLocked && !editContactSelected) || lockCallingFor} />
        </Col>
      </Row>
      <Row>
        <Col md="5">
          <ReasonForCall basePath='lead' />
        </Col>
      </Row>
      <Row>
        <Col md="5">
          <InquiryType name='lead.inquiryType' locked={isLocked && isContactCenterBuildingId} />
        </Col>
      </Row>
      <Row>
        <Col md="5">
          <VeteranStatus basePath='lead.prospect' />
        </Col>
      </Row>
      <Row>
        <Col md="5">
          <LeadSource leadSource={leadSource} lead={lead} disable2ndLeadSource={disable2ndLeadSource} leadSourceDetail={leadSourceDetail} locked={isLocked && isContactCenterBuildingId} />
        </Col>
      </Row>
      <Row>
        <Col md="5">
          <UMID basePath='lead' />
        </Col>
      </Row>
      <Row>
        <Col md="5">
          <CallerType basePath='lead' />
        </Col>
      </Row>
    </StyledFormSection>
  )
})

ResultOfCallSection.displayName = 'ResultOfCallSection';
ResultOfCallSection.propTypes = {
    leadSource: PropTypes.number.isRequired,
    leadSourceDetail: PropTypes.number.isRequired,
    resultOfCall: PropTypes.string.isRequired,
    lockCallingFor: PropTypes.bool,
}