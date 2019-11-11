import React from 'react';
import { Alert, Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import queryString from 'query-string';
import { Form, ErrorMessage, withFormik } from 'formik';
import { withAuth } from '@okta/okta-react';
import { toast } from 'react-toastify';
import AdditionalCareElements from '../../components/AdditionalCareElements';
import { ADLNeeds, Drivers, FinancialOptions } from '../../components/checkboxes';
import AlertConfirm from '../../components/AlertConfirm';
import CareType from '../../components/CareType';
import Contact from '../../components/Contact';
import { formValidationSchema } from './ValidationSchema';
import InquiryType from '../../components/InquiryType';
import LeadSource from '../../components/LeadSource';
import ResultOfCall from '../../components/ResultOfCall'
import Note from '../../components/Note';
import Prospect from '../../components/Prospect';
import ReasonForCall from '../../components/ReasonForCall';
import SecondPerson from '../../components/SecondPerson';
import VeteranStatus from '../../components/VeteranStatus';
import { Debug } from '../../components/Debug';
import { SalesAPIService } from "../../services/SalesServices";
import { ObjectMappingService } from "../../services/Types";
import { checkAuthentication } from '../../auth/checkAuth';
import Communities from '../../components/communities';
import { getCommunitiesErrors } from './validators';

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

    const isLocked = (values.lead.leadId != null)
    const isContactCenterBuildingId = (values.lead.buildingId === 225707 ? true : false)

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
          <Contact
            key="influencer-contact"
            type="influencer"
            contact={values.lead.influencer}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isReadOnly={status.readOnly}
            duplicateCheck={true}
            hasAddress={true}
            setFieldValue={setFieldValue}
            isContactCenter={isContactCenterBuildingId}
            {...this.props}
          >
          </Contact>
        </section>
        <br />
        <section className="prospect-section">
          <Note
            labelId="situationLabel"
            label="Situation"
            id="situation"
            handleChange={handleChange}
            handleBlur={handleBlur}
            isReadOnly={status.readOnly}
            rows={6}
          />
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
          <Prospect
            contact={values.lead.prospect}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isReadOnly={status.readOnly}
            duplicateCheck={false}
            showProspect={values.lead.callingFor === 'Myself'}
            {...this.props}
          />
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
              <Note
                labelId="passionPersonalityLabel"
                label="Passions &amp; Personality"
                id="passionsPersonality"
                handleChange={handleChange}
                handleBlur={handleBlur}
                isReadOnly={status.readOnly}
              />
            </Col>
          </Row>
        </section>
        <Row>
          <Col>
            <Note
              labelId="financialSituationLabel"
              label="Financial Situation"
              id="financialSituation"
              handleChange={handleChange}
              handleBlur={handleBlur}
              isReadOnly={status.readOnly}
            />
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
            <Note
              labelId="additionalNotesLabel"
              label="Additional Notes"
              id="additionalNotes"
              handleChange={handleChange}
              handleBlur={handleBlur}
              isReadOnly={status.readOnly}
            />
          </Col>
        </Row>
        <br />
          <Drivers basePath='lead.drivers' isReadOnly={status.readOnly} />
        <br />
        <SecondPerson
          key="secondPerson-contact"
          contact={values.lead.secondPerson}
          handleChange={handleChange}
          handleBlur={handleBlur}
          isReadOnly={status.readOnly}
          duplicateCheck={false}
          {...this.props}
        />
        <br />
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
              <Label for="callingFor" className="label-format required-field">I am calling for</Label>
              <Input 
                type="select" 
                id="callingFor" 
                name="lead.callingFor" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                disabled={(status.readOnly || isLocked)}
                value={values.lead.callingFor}
              >
                <option value="">Select One</option>
                <option>Myself</option>
                <option>Parent</option>
                <option>Spouse</option>
                <option>Friend</option>
                <option>Other</option>
              </Input>
              <ErrorMessage name="lead.callingFor" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
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
            <InquiryType
              handleChange={handleChange}
              handleBlur={handleBlur}
              defaultValue={values.lead.inquiryType}
              isReadOnly={status.readOnly || isLocked}
              isContactCenter={isContactCenterBuildingId}
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <VeteranStatus
              handleChange={handleChange}
              handleBlur={handleBlur}
              defaultValue={values.lead.prospect.veteranStatus}
              isReadOnly={status.readOnly}
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <LeadSource key="leadsource"
              defaultLeadSource={values.lead.leadSource}
              defaultLeadSourceDetail={values.lead.leadSourceDetail}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              isReadOnly={status.readOnly || isLocked}
              isContactCenter={isContactCenterBuildingId}
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <FormGroup>
              <Label for="umid" className="label-format required-field">UMID</Label>
              <Input name='lead.umid'
                type="text"
                id="umid"
                value={values.lead.umid || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={status.readOnly}
                placeholder="UMID" />
              <ErrorMessage name="lead.umid" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Label for="callerType" className="label-format required-field">What is the gender of the caller?</Label>
            <select
              className="form-control"
              id="callerType"
              name="lead.callerType"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status.readOnly}
              value={values.lead.callerType}
            >
              <option value="">Select One</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="U">Unknown</option>
            </select>
            <ErrorMessage name="lead.callerType" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
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
