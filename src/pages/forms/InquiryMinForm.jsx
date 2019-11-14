import React from 'react';
import { Col, FormGroup, Label, Row, Spinner } from 'reactstrap';
import queryString from 'query-string';
import { Form, withFormik } from 'formik';
import { withAuth } from '@okta/okta-react';
import { toast } from 'react-toastify';
import AdditionalCareElements from '../../components/AdditionalCareElements';
import { ADLNeeds, Drivers, FinancialOptions } from '../../components/checkboxes';
import AlertConfirm from '../../components/AlertConfirm';
import CareType from '../../components/CareType';
import { Influencer, Prospect, SecondPerson } from '../../components/persons';
import { formValidationSchema } from './ValidationSchema';
import { InquiryType } from '../../components/InquiryType';
import { LeadSource } from '../../components/LeadSource';
import ResultOfCall from '../../components/ResultOfCall'
import { Note } from '../../components/Note';
import ReasonForCall from '../../components/ReasonForCall';
import { VeteranStatus } from '../../components/VeteranStatus';
import { Debug } from '../../components/Debug';
import { SalesAPIService } from "../../services/SalesServices";
import { ObjectMappingService } from "../../services/Types";
import { checkAuthentication } from '../../auth/checkAuth';
import Communities from '../../components/communities';
import { getCommunitiesErrors } from './validators';
import { Input, Select } from '../../components/formik-inputs';

class InquiryForm extends React.Component {
  TOP = React.createRef();
  state = {
    loading: true,
  };

  salesapi = new SalesAPIService();
  checkAuthentication = checkAuthentication.bind(this);

  async componentDidMount() {
    const { guid, umid, leadId } = queryString.parse(this.props.location.search);
    this.checkAuthentication(this.getAuthCredentials);

    let lead = {};
    if (umid) {
      lead.umid = umid;
    } else if (guid || leadId) {
      lead = await this.salesapi.getLeadById({guid:guid, leadId:leadId});
    } else {
      lead = ObjectMappingService.createEmptyLead();
    }

    this.props.setFieldValue('lead', lead)
    this.props.setFieldValue('communities', []);
    this.setState({ loading: false });
  }

  getAuthCredentials = (userInfo) => {
    if (userInfo) {
      const user = {
        email: userInfo.email,
        name: userInfo.name,
        username: userInfo.preferred_username,
        zone: userInfo.zoneinfo,
        locale: userInfo.locale,
      }
      this.props.setFieldValue('user', user)
    }
  }

  displayValidationError = () => {
    toast.error("Please fix the errors before continuing.", {
      position: toast.POSITION.TOP_CENTER
    });
  }

  scrollToTop = () => {
    setTimeout(() => {
      this.TOP.current.scrollIntoView({
        behavior: 'smooth',
      })
    }, 500)
  }

  handleFormSubmit = (e) => {
    try {
      this.props.handleSubmit(e)
      if (!this.props.isValid) {
        this.scrollToTop();
        this.displayValidationError();
      }
    }
    catch (err) {
      this.scrollToTop();
    }
  }

  isLeadFromContactCenterBuilding = (lead) => {
    return lead.buildingId === 225707;
  }

  updateLead = (lead) => {
    const { values, setFieldValue, validateForm } = this.props;
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
      prospect: { ...values.lead.prospect, ...lead.prospect, age: lead.prospect.age || '' },
      secondPerson: { ...values.lead.secondPerson, ...lead.secondPerson },
    };
    setFieldValue('lead', newLead);
    validateForm( { ...values, lead: newLead });
  }

  render() {
    const {
      values,
      status,
      errors,
      isValid,
      isSubmitting,
      handleChange,
      handleBlur,
      setFieldValue,
    } = this.props;

    const isLocked = !!values.lead.leadId;
    const isExistingContact = !!values.lead.influencer.contactId;
    const isContactCenterBuildingId = this.isLeadFromContactCenterBuilding(values.lead);

    if (this.state.loading) {
      return (
        <Spinner type="border" size="md" color="secondary">Loading Lead</Spinner>
      )
    }

    if (this.props.value && this.props.value.lead) {
      console.log(`Lead Submitted: ${this.props.value.lead.leadId}`)
    }

    return (
      <Form onSubmit={this.props.handleSubmit} className="inquiryForm">
        <section>
          <div ref={this.TOP}></div>
        </section>
        <section className="influencer-section">
          <Influencer
            basePath='lead'
            contact={values.lead.influencer}
            isReadOnly={status.readOnly}
            updateLead={this.updateLead}
            isLeadFromContactCenterBuilding={this.isLeadFromContactCenterBuilding}
            locked={isLocked || isExistingContact}
          />
        </section>
        <br />
        <section className="prospect-section">
          <Note name='lead.notes.situation' label="Situation" rows={6} />
          <Row>
            <Col>
              <ADLNeeds basePath='lead.adlNeeds' isReadOnly={status.readOnly} />
            </Col>
          </Row>
          <br />
          <AdditionalCareElements
            lead={values.lead}
            setFieldValue={setFieldValue}
            isReadOnly={status.readOnly}
          />
          <br />
          <Prospect basePath='lead' showProspect={values.lead.callingFor === 'Myself'} locked={isLocked} />
          <br />
          <CareType
            handleChange={handleChange}
            handleBlur={handleBlur}
            isReadOnly={status.readOnly}
            defaultValue={values.lead.careType}
          />
          <br />
          <Row>
            <Col>
              <Note name='lead.notes.passionsPersonality' label="Passions &amp; Personality" />
            </Col>
          </Row>
        </section>
        <Row>
          <Col>
            <Note name='lead.notes.financialSituation' label="Financial Situation" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Communities username={values.user.username} />
          </Col>
        </Row>
        <br />
        <hr />
          <FinancialOptions basePath='lead.financialOptions' isReadOnly={status.readOnly} />
        <br />
        <Row>
          <Col>
            <Note name='lead.notes.additionalNotes' label="Additional Notes" />
          </Col>
        </Row>
        <br />
          <Drivers basePath='lead.drivers' isReadOnly={status.readOnly} />
        <br />
        <SecondPerson basePath='lead' hasSecondPerson={values.lead.secondPerson.selected} locked={isLocked} />
        <Row>
          <Col md="5">
            <ResultOfCall
              key="nextsteps"
              id="nextStepsLabel"
              handleChange={handleChange}
              handleBlur={handleBlur}
              isReadOnly={status.readOnly}
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <FormGroup>
              <Label for="lead.callingFor" className="label-format required-field">I am calling for</Label>
              <Select name="lead.callingFor" disabled={isLocked} placeholder='Select One'>
                <option>Myself</option>
                <option>Parent</option>
                <option>Spouse</option>
                <option>Friend</option>
                <option>Other</option>
              </Select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <ReasonForCall
              handleChange={handleChange}
              handleBlur={handleBlur}
              defaultValue={values.lead.reasonForCall}
              isReadOnly={status.readOnly}
            />
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
            <LeadSource leadSource={values.lead.leadSource} locked={isLocked && isContactCenterBuildingId} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <FormGroup>
              <Label for="lead.umid" className="label-format required-field">UMID</Label>
              <Input name="lead.umid" placeholder="UMID" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Label for="callerType" className="label-format required-field">What is the gender of the caller?</Label>
            <Select name="lead.callerType" placeholder="Select One">
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="U">Unknown</option>
            </Select>
          </Col>
        </Row>
        <br />
        <div className="float-right">
          <AlertConfirm key="alertConfirm"
            buttonLabel='Submit'
            handleSubmit={this.handleFormSubmit}
            handleValidate={this.props.validateForm}
            handleReset={this.props.handleReset}
            isSubmitting={isSubmitting}
            setFieldTouched={this.props.setFieldTouched}
            errors={errors}
            isValid={isValid}
            isReadOnly={status.readOnly}
          />
        </div>
        {process.env.REACT_APP_NODE_ENV !== "production" && <Debug />}
      </Form>
    );
  }
}

const EnhancedInquiryForm = withFormik({
  displayName: 'InquiryForm',
  enableReinitialize: true,
  validationSchema: formValidationSchema,
  validateOnChange: false,

  validate: (values) => {
    const errors = getCommunitiesErrors(values.communities);
    return errors.some(x => !!x)
      ? { communities: errors }
      : {};
  },

  mapPropsToValues: (props) => {
    return {
      communities: [],
      lead: ObjectMappingService.createEmptyLead(),
      user: {},
    }
  },

  mapPropsToStatus: (props) => {
    return {
      readOnly: false,
      successful: false,
    }
  },

  handleSubmit: async (values, { setSubmitting, setErrors, setStatus }) => {
    setSubmitting(true);
    const salesService = new SalesAPIService();
    try {
      const lead = await salesService.submitToService({ ...values });
      setStatus({
        successful: true,
        readOnly: true,
      })
      console.log(`Lead Id: ${lead.leadId}`)
      toast.success("Request was submitted successfully.", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    catch (err) {
      setStatus({
        successful: false,
        readOnly: false,
        error: true,
      })
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    finally {
      setSubmitting(false);
    }
  },

})(InquiryForm);

export default withAuth(EnhancedInquiryForm);
