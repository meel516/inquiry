import React from 'react';
import { Alert, Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import queryString from 'query-string';
import { Form, ErrorMessage, withFormik } from 'formik';
import { withAuth } from '@okta/okta-react';
import { toast } from 'react-toastify';

import AdditionalCareElements from '../../components/AdditionalCareElements';
import Address from '../../components/Address';
import ADLNeeds from '../../components/ADLNeeds';
import AlertConfirm from '../../components/AlertConfirm';
import CareType from '../../components/CareType';
import CommunitySelect from '../../components/CommunitySelect';
import Contact from '../../components/Contact';
import Drivers from '../../components/Drivers';
import DisplayErrors from '../../components/DisplayErrors';
import FinancialOptions from '../../components/FinancialOptions';
import { mainFormValidationSchema } from './ValidationSchema';
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
import { CommunityService } from '../../services/CommunityServices';
import { checkAuthentication } from '../../auth/checkAuth';

class InquiryForm extends React.Component {
  MAX_COMMUNITIES = 5;
  state = {
    communities: [],
    allowAddCommunities: true,
    lead: null,
    loading: true,
  };
  salesapi = new SalesAPIService();
  checkAuthentication = checkAuthentication.bind(this);

  async componentDidMount() {
    const { guid, umid, leadId } = queryString.parse(this.props.location.search);
    console.log(`(GUID: ${guid} OR COID/LEADID: ${leadId}) and UMID: ${umid}`);

    this.checkAuthentication(this.getAuthCredentials);

    let leadObj = null;
    if (guid) {
      leadObj = await this.salesapi.getLeadByGuid(guid)
    }
    if (leadId) {
      leadObj = await this.salesapi.getLeadById(leadId)
    }
    else {
      leadObj = ObjectMappingService.createEmptyLead()
    }
    if (umid) {
      leadObj.umid = umid;
      this.props.setFieldValue('lead.umid', umid)
    }
    this.props.setFieldValue('lead', leadObj)

    this.setState({
      loading: false,
      lead: leadObj,
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
      let community = CommunityService.createCommunity()
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

  handleFormSubmit = (e) => {
    const promise = new Promise((resolve, reject) => {
      try {
        this.props.handleSubmit(e)
        if (this.props.isValid) {
          resolve()
        }
        else {
          reject()
        }
      }
      catch (err) {
        reject()
      }
    })

    return promise;
  }

  render() {
    const {
      touched,
      errors,
      dirty,
      isValid,
      isSubmitting,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldTouched,
    } = this.props;

    if (this.state.loading) {
      return 'Loading Form...'
    }

    return (
      <Form onSubmit={this.props.handleSubmit} className="inquiryForm">
        <DisplayErrors
          status={this.props.status}
          errors={this.props.errors}
          valid={this.props.isValid}
        />
        <section className="influencer-section">
          <Contact
            key="influencer-contact"
            type="influencer"
            contact={this.props.values.lead.influencer}
            handleChange={this.props.handleChange}
            handleBlur={this.props.handleBlur}
            isReadOnly={this.props.status.readOnly}
            duplicateCheck={true}
          >
            <Address
              type="influencer"
              address={this.props.values.lead.influencer.address}
              handleChange={this.props.handleChange}
              handleBlur={this.props.handleBlur}
              isReadOnly={this.props.status.readOnly}
              {...this.props}
            />
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
                {...this.props}
              />
            ))}
          </Col>
        </Row>
        <br />
        <hr />
        <FinancialOptions {...this.props} />
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
          contact={this.props.values.lead.secondPerson}
          handleChange={this.props.handleChange}
          handleBlur={this.props.handleBlur}
          isReadOnly={this.props.status.readOnly}
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
              <Input type="select" id="callingFor" name="lead.callingFor" onChange={this.props.handleChange} onBlur={this.props.handleBlur} disabled={this.props.status.readOnly}>
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
              isReadOnly={this.props.status.readOnly}
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
              isReadOnly={this.props.status.readOnly}
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
          {/* <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>Submit</Button>{' '} */}
          <AlertConfirm key="alertConfirm"
            buttonLabel='Submit'
            handleSubmit={this.handleFormSubmit}
            handleValidate={this.props.validateForm}
            handleReset={this.props.handleReset}
            isSubmitting={this.props.isSubmitting}
            setFieldTouched={this.props.setFieldTouched}
            errors={this.props.errors}
            isValid={this.props.isValid}
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
  validationSchema: mainFormValidationSchema,

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
    debugger
    setSubmitting(true);
    const salesService = new SalesAPIService();
    try {
      await salesService.submitToService({ ...values });
      setStatus({
        successful: true,
        readOnly: true,
      })
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
      setErrors({
        error: err.message
      })
    }
    finally {
      setSubmitting(false);
    }
  },

})(InquiryForm);

export default withAuth(EnhancedInquiryForm);
