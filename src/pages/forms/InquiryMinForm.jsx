import React from 'react';
import { Alert, Button, Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import queryString from 'query-string';
import { Form, ErrorMessage, withFormik } from 'formik';
import { withAuth } from '@okta/okta-react';
import { toast } from 'react-toastify';

import AdditionalCareElements from '../../components/AdditionalCareElements';
import ADLNeeds from '../../components/ADLNeeds';
import AlertConfirm from '../../components/AlertConfirm';
import CareType from '../../components/CareType';
import CommunitySelect from '../../components/CommunitySelect';
import Contact from '../../components/Contact';
import Drivers from '../../components/Drivers';
import FinancialOptions from '../../components/FinancialOptions';
import { formValidationSchema } from './ValidationSchema';
import InquiryType from '../../components/InquiryType';
import LeadSource from '../../components/LeadSource';
import NextSteps from '../../components/NextSteps'
import Note from '../../components/Note';
import Prospect from '../../components/Prospect';
import ReasonForCall from '../../components/ReasonForCall';
import SecondPerson from '../../components/SecondPerson';
import VeteranStatus from '../../components/VeteranStatus';
import { Debug } from '../../components/Debug';

import { SalesAPIService } from "../../services/SalesServices";
import { ObjectMappingService } from "../../services/Types";
import createCommunity from '../../services/community-services/create-community'
import { checkAuthentication } from '../../auth/checkAuth';

class InquiryForm extends React.Component {
  TOP = React.createRef();

  MAX_COMMUNITIES = 5;
  state = {
    allowAddCommunities: true,
    loading: true,
  };

  salesapi = new SalesAPIService();
  checkAuthentication = checkAuthentication.bind(this);

  async componentDidMount() {
    const { guid, umid, leadId } = queryString.parse(this.props.location.search);
    this.checkAuthentication(this.getAuthCredentials);

    let locked = false
    let lead = null
    let communities = []
    if (guid||leadId) {
      lead = await this.salesapi.getLeadById({guid:guid, leadId:leadId})
      locked = true
    } 
    else {
      lead = ObjectMappingService.createEmptyLead()
    }
    if (umid) {
      lead.umid = umid;
    }
    this.props.setFieldValue('lead', lead)
    this.props.setFieldValue('communities', communities)

    this.setState({
      loading: false,
    })
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

  handleAddCommunity = (values) => {
    this.setState((state) => {
      let communities = values.communities
      let community = createCommunity()
      communities.push(community)

      let allowAddCommunities = true;
      if (communities.length > (this.MAX_COMMUNITIES - 1)) {
        allowAddCommunities = false;
      }
      return {
        communities: communities,
        allowAddCommunities: allowAddCommunities,
      }
    })
  }

  handleRemoveCommunity = (uuid, values) => {
    if (uuid !== undefined || uuid !== null) {
      let communities = (values.communities || []).filter((community) => (community.uuid !== uuid));
      let allowAddCommunities = true;

      if (communities.length < this.MAX_COMMUNITIES) {
        allowAddCommunities = true
      } else {
        allowAddCommunities = false
      }

      this.setState({
        communities: communities,
        allowAddCommunities: allowAddCommunities,
      })
      values.communities = communities || [];
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
      touched,
      errors,
      dirty,
      isValid,
      isSubmitting,
      handleChange,
      handleBlur,
      setFieldValue,
    } = this.props;
    const isLocked = (this.props.values.lead.leadId != null)

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
            contact={this.props.values.lead.influencer}
            handleChange={this.props.handleChange}
            handleBlur={this.props.handleBlur}
            isReadOnly={this.props.status.readOnly}
            duplicateCheck={true}
            hasAddress={true}
            setFieldValue={this.props.setFieldValue}
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
            handleChange={this.props.handleChange}
            handleBlur={this.props.handleBlur}
            isReadOnly={this.props.status.readOnly}
            rows={6}
          />
          <Row>
            <Col>
              <ADLNeeds
                adlNeeds={this.props.values.lead.adlNeeds}
                setFieldValue={this.props.setFieldValue}
                isReadOnly={this.props.status.readOnly}
              />
            </Col>
          </Row>
          <br />
          <AdditionalCareElements
            lead={this.props.values.lead}
            setFieldValue={this.props.setFieldValue}
            isReadOnly={this.props.status.readOnly}
          />
          <br />
          <Prospect
            contact={this.props.values.lead.prospect}
            handleChange={this.props.handleChange}
            handleBlur={this.props.handleBlur}
            isReadOnly={this.props.status.readOnly}
            duplicateCheck={false}
            isProspect={this.props.values.lead.callingFor === 'Myself'}
            {...this.props}
          />
          <br />
          <CareType
            handleChange={this.props.handleChange}
            handleBlur={this.props.handleBlur}
            isReadOnly={this.props.status.readOnly}
          />
          <br />
          <Row>
            <Col>
              <Note
                labelId="passionPersonalityLabel"
                label="Passions &amp; Personality"
                id="passionsPersonality"
                handleChange={this.props.handleChange}
                handleBlur={this.props.handleBlur}
                isReadOnly={this.props.status.readOnly}
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
              handleChange={this.props.handleChange}
              handleBlur={this.props.handleBlur}
              isReadOnly={this.props.status.readOnly}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button color="primary" size="sm" aria-pressed="false"
              disabled={!this.state.allowAddCommunities || this.props.status.readOnly} onClick={() => this.handleAddCommunity(this.props.values)}>Add Community</Button>
            {this.props.values.communities.map((community, index) => (
              <CommunitySelect
                key={community.uuid}
                index={index}
                community={community}
                handleChange={this.props.handleChange}
                handleBlur={this.props.handleBlur}
                setFieldValue={this.props.setFieldValue}
                onRemove={() => this.handleRemoveCommunity(community.uuid, this.props.values)}
                isReadOnly={this.props.status.readOnly}
                {...this.props}
              />
            ))}
          </Col>
        </Row>
        <br />
        <hr />
        <FinancialOptions
          key="financialOptions"
          setFieldValue={this.props.setFieldValue}
          isReadOnly={this.props.status.readOnly}
        />
        <br />
        <Row>
          <Col>
            <Note
              labelId="additionalNotesLabel"
              label="Additional Notes"
              id="additionalNotes"
              handleChange={this.props.handleChange}
              handleBlur={this.props.handleBlur}
              isReadOnly={this.props.status.readOnly}
            />
          </Col>
        </Row>
        <br />
        <Drivers
          key="drivers"
          setFieldValue={this.props.setFieldValue}
          isReadOnly={this.props.status.readOnly}
        />
        <br />
        <SecondPerson
          key="secondPerson-contact"
          contact={this.props.values.lead.secondPerson}
          handleChange={this.props.handleChange}
          handleBlur={this.props.handleBlur}
          isReadOnly={this.props.status.readOnly}
          duplicateCheck={false}
          {...this.props}
        />
        <br />
        <Row>
          <Col md="5">
            <NextSteps
              key="nextsteps"
              id="nextStepsLabel"
              handleChange={this.props.handleChange}
              handleBlur={this.props.handleBlur}
              isReadOnly={this.props.status.readOnly}
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
                onChange={this.props.handleChange} 
                onBlur={this.props.handleBlur} 
                disabled={this.props.status.readOnly || isLocked}
                value={this.props.values.lead.callingFor}
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
              handleChange={this.props.handleChange}
              handleBlur={this.props.handleBlur}
              defaultValue={this.props.values.lead.reasonForCall}
              isReadOnly={this.props.status.readOnly}
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <InquiryType
              handleChange={this.props.handleChange}
              handleBlur={this.props.handleBlur}
              defaultValue={this.props.values.lead.inquiryType}
              isReadOnly={this.props.status.readOnly || isLocked}
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <VeteranStatus
              handleChange={this.props.handleChange}
              handleBlur={this.props.handleBlur}
              defaultValue={this.props.values.lead.prospect.veteranStatus}
              isReadOnly={this.props.status.readOnly}
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <LeadSource key="leadsource"
              defaultLeadSource={this.props.values.lead.leadSource}
              defaultLeadSourceDetail={this.props.values.lead.leadSourceDetail}
              handleChange={this.props.handleChange}
              handleBlur={this.props.handleBlur}
              setFieldValue={this.props.setFieldValue}
              isReadOnly={this.props.status.readOnly || isLocked}
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
                value={this.props.values.lead.umid}
                onChange={this.props.handleChange}
                onBlur={this.props.handleBlur}
                readOnly={this.props.status.readOnly}
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
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              disabled={this.props.status.readOnly}
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
            isSubmitting={this.props.isSubmitting}
            setFieldTouched={this.props.setFieldTouched}
            errors={this.props.errors}
            isValid={this.props.isValid}
            isReadOnly={this.props.status.readOnly}
          />
        </div>

        {process.env.REACT_APP_NODE_ENV !== "production" &&
          <Debug />}

      </Form>
    );
  }
}

const EnhancedInquiryForm = withFormik({
  displayName: 'InquiryForm',
  enableReinitialize: true,
  validationSchema: formValidationSchema,

  mapPropsToValues: (props) => {
    return {
      communities: [],
      lead: ObjectMappingService.createEmptyLead(),
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
