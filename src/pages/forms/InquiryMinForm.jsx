import React, { useCallback, useRef } from 'react';
import { Col, Row } from 'reactstrap';
import { Form, withFormik } from 'formik';
import { withAuth } from '@okta/okta-react';
import { toast } from 'react-toastify';
import { ADLNeeds, Drivers, FinancialOptions } from '../../components/checkbox-groups';
import { AdditionalCareElements } from '../../components/additional-care-elements';
import { AlertConfirm } from '../../components/AlertConfirm';
import { Influencer, Prospect, SecondPerson } from '../../components/persons';
import { formValidationSchema } from './ValidationSchema';
import { InquiryType } from '../../components/InquiryType';
import { LeadSource } from '../../components/LeadSource';
import { Debug } from '../../components/Debug';
import { SalesAPIService } from "../../services/SalesServices";
import Communities from '../../components/communities';
import { getCommunitiesErrors } from './validators';
import { StyledFormSection } from './styled';
import {
  CallerType,
  CallingFor,
  CareType,
  Note,
  ResultOfCall,
  ReasonForCall,
  UMID,
  VeteranStatus,
} from '../../components/form-items';

const InquiryForm = ({
  values,
  status,
  isValid,
  setFieldValue,
  validateForm,
  handleSubmit,
}) => {
  const TOP = useRef(null);

  const handleFormSubmit = useCallback((e) => {
    handleSubmit(e);

    if (!isValid) {
      toast.error("Please fix the errors before continuing.", {
        position: toast.POSITION.TOP_CENTER
      });
    }

    setTimeout(() => TOP.current.scrollIntoView({ behavior: 'smooth' }), 500);
  }, [isValid, handleSubmit])

  const isLeadFromContactCenterBuilding = useCallback((lead) => {
    return lead.buildingId === 225707;
  }, []);

  const updateLead = useCallback((lead) => {
    const age = lead.prospect
      ? lead.prospect.age || ''
      : '';
    const newLead = {
      ...values.lead,
      ...lead,
      adlNeeds: { ...values.lead.adlNeeds, ...lead.adlNeeds },
      drivers: { ...values.lead.drivers, ...lead.driveers },
      financialOptions: { ...values.lead.financialOptions, ...lead.financialOptions },
      memoryConcerns: { ...values.lead.memoryConcerns, ...lead.memoryConcerns },
      mobilityConcerns: { ...values.lead.mobilityConcerns, ...lead.mobilityConcerns },
      notes: { ...values.lead.notes, ...lead.notes },
      nutritionConcerns: { ...values.lead.nutritionConcerns, ...lead.nutritionConcerns },
      prospect: { ...values.lead.prospect, ...lead.prospect, age },
      secondPerson: { ...values.lead.secondPerson, ...lead.secondPerson },
    };
    setFieldValue('lead', newLead);
    validateForm( { ...values, lead: newLead });
  }, [values, setFieldValue, validateForm])

  const isLocked = !!values.lead.leadId;
  const isExistingContact = !!values.lead.influencer.contactId;
  const isContactCenterBuildingId = isLeadFromContactCenterBuilding(values.lead);
  const hideProspect = values.lead.callingFor === 'Myself' && !(values.lead.prospect && values.lead.prospect.contactId);

  return (
    <Form onSubmit={handleSubmit}>
      <section>
        <div ref={TOP}></div>
      </section>
      <StyledFormSection id='contactInfo'>
        <Influencer
          basePath='lead'
          contact={values.lead.influencer}
          isReadOnly={status.readOnly}
          updateLead={updateLead}
          isLeadFromContactCenterBuilding={isLeadFromContactCenterBuilding}
          locked={isLocked || isExistingContact}
        />
      </StyledFormSection>
      <StyledFormSection id='situation'>
        <Note name='lead.notes.situation' label="Situation" rows={6} />
        <Row>
          <Col>
            <ADLNeeds basePath='lead.adlNeeds' isReadOnly={status.readOnly} />
          </Col>
        </Row>
        <AdditionalCareElements basePath='lead' isReadOnly={status.readOnly} />
        <Prospect basePath='lead' hideProspect={hideProspect} locked={isLocked} />
        <CareType basePath='lead' />
      </StyledFormSection>
      <StyledFormSection id='passionPersonality'>
        <Note name='lead.notes.passionsPersonality' label="Passions &amp; Personality" />
        <Communities username={values.user.username} />
      </StyledFormSection>
      <StyledFormSection id='budget'>
        <Note name='lead.notes.financialSituation' label="Financial Situation" />
        <FinancialOptions basePath='lead.financialOptions' isReadOnly={status.readOnly} />
        <Note name='lead.notes.additionalNotes' label="Additional Notes" />
        <Drivers basePath='lead.drivers' isReadOnly={status.readOnly} />
        <SecondPerson basePath='lead' hasSecondPerson={values.lead.secondPerson.selected} locked={isLocked} />
      </StyledFormSection>
      <StyledFormSection id='resultOfCall'>
        <Row>
          <Col md="5">
            <ResultOfCall basePath='lead' />
          </Col>
        </Row>
        <Row>
          <Col md="5">
              <CallingFor basePath='lead' locked={isLocked} />
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
            <LeadSource leadSource={values.lead.leadSource} leadSourceDetail={values.lead.leadSourceDetail} locked={isLocked && isContactCenterBuildingId} />
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
      {
        !status.readOnly && (
          <div className="float-right">
            <AlertConfirm handleSubmit={handleFormSubmit} />
          </div>
        )
      }
      {process.env.REACT_APP_NODE_ENV !== "production" && <Debug />}
    </Form>
  );
}

const EnhancedInquiryForm = withFormik({
  displayName: 'InquiryForm',
  enableReinitialize: true,
  validationSchema: formValidationSchema,
  validateOnChange: false,
  validateOnMount: true,
  validate: (values) => {
    const errors = getCommunitiesErrors(values.communities);
    return errors.some(x => !!x)
      ? { communities: errors }
      : {};
  },
  mapPropsToValues: ({ lead, user }) => ({ lead, user, communities: [] }),
  mapPropsToStatus: () => ({ readOnly: false, successful: false }),
  handleSubmit: (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);
    const salesService = new SalesAPIService();
    salesService.submitToService({ ...values })
      .then(() => {
        setStatus({ successful: true, readOnly: true });
        toast.success("Request was submitted successfully.", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch((err) => {
        setStatus({ successful: false, readOnly: false, error: true });
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .finally(() => setSubmitting(false))
  },
})(InquiryForm);

export default withAuth(EnhancedInquiryForm);
