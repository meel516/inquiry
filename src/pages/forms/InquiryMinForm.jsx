import React from 'react';
import { Alert, Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import queryString from 'query-string';
import { Form, ErrorMessage, withFormik } from 'formik';
import { withAuth } from '@okta/okta-react';

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
// import { getRefsMap } from '../../utils/ScrollToError';

class InquiryForm extends React.Component {
  constructor(props) {
    super(props);
    this.TOP = React.createRef();
    // const errorRefsMap = getRefsMap();
  }

  MAX_COMMUNITIES = 5;
  state = {
    communities: [],
    allowAddCommunities: true,
    lead: null,
    loading: true,
    scrollToTop: false,
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

    console.log(`Node Env: ${process.env.NODE_ENV}`)
    this.setState({
      loading: false,
      lead: leadObj,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate: prevState.scrollToTop: ", prevState.scrollToTop, 'prevState.scrollToTop', prevState.scrollToTop)
    if (prevState.scrollToTop !== this.state.scrollToTop) {
      if(this.props.errors === '') {
        if(this.props.isSubmitting === true) {
          this.setState({ scrollToTop: false})
        }
      }
    } 
    if(this.state.scrollToTop) {
      this.TOP.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
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
    if (this.props.errors !== '') {
      this.setState({ scrollToTop: true })
    }
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
      catch(err) {
        reject()
      }
    })

    return promise;
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
      handleSubmit,
      handleReset,
      setFieldValue,
      setFieldTouched,
      validateForm,
    } = this.props;

    console.log(`Formik Status: ${JSON.stringify(status)}`)

    if (this.state.loading) {
      return 'Loading Form...'
    }

    return (
      <Form onSubmit={handleSubmit} className="inquiryForm">
        <DisplayErrors 
          status={this.props.status} 
          errors={this.props.errors} 
          valid={this.props.isValid} 
        />
        <section>
          <div ref={this.TOP}></div>
          {/* <Row>
          <input type="text" id="topText" name="topText" ref={this.TOP}></input>
          </Row> */}
        </section>
        <section className="influencer-section">
          <Contact 
            key="influencer-contact" 
            type="influencer" 
            contact={values.lead.influencer} 
            handleChange={this.props.handleChange} 
            handleBlur={this.props.handleBlur} 
            isReadOnly={status.readOnly} 
            {...this.props}
          >
            <Address 
              type="influencer" 
              address={values.lead.influencer.address} 
              onChange={this.props.handleChange} 
              onBlur={this.props.handleBlur} 
              isReadOnly={status.readOnly} 
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
            onChange={this.props.handleChange} 
            onBlur={this.props.handleBlur} 
            isReadOnly={this.props.status.readOnly}
            rows={6}
          />
          <Row>
            <Col>
              <ADLNeeds adlNeeds={values.lead.adlNeeds} {...this.props} />
            </Col>
          </Row>
          <br />
          <AdditionalCareElements {...this.props} />
          <br />
          <Prospect 
            contact={this.props.values.lead.prospect} 
            handleChange={this.props.handleChange} 
            handleBlur={this.props.handleBlur}
            isReadOnly={status.readOnly}
            {...this.props} />
          <br />
          <CareType 
            handleChange={handleChange} 
            handleBlur={handleBlur} 
            isReadOnly={status.readOnly} 
          />
          <br />
          <Row>
            <Col>
              <Note 
                labelId="passionPersonalityLabel" 
                label="Passions &amp; Personality" 
                id="passionsPersonality" 
                onChange={this.props.handleChange} 
                onBlur={this.props.handleBlur} 
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
              onChange={this.props.handleChange} 
              onBlur={this.props.handleBlur} 
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button color="primary" size="sm" aria-pressed="false" disabled={!this.state.allowAddCommunities} onClick={() => this.handleAddCommunity(values)}>Add Community</Button>
            {this.props.values.communities.map((community, index) => (
              <CommunitySelect key={community.uuid} index={index} community={community} onRemove={() => this.handleRemoveCommunity(community.uuid, values)} {...this.props} />
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
              onChange={this.props.handleChange} 
              onBlur={this.props.handleBlur} 
            />
          </Col>
        </Row>
        <br />
        <Drivers setFieldValue={setFieldValue} />
        <br />
        <SecondPerson contact={this.props.values.lead.secondPerson} {...this.props} />
        <br />
        <Row>
          <Col md="5">
            <NextSteps id="nextStepsLabel" onChange={handleChange} onBlur={handleBlur} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <FormGroup>
              <Label for="callingFor" className="label-format required-field">I am calling for</Label>
              <select className="form-control" id="callingFor" name="lead.callingFor" onChange={handleChange} onBlur={handleBlur}>
                <option value="">Select One</option>
                <option>Myself</option>
                <option>Parent</option>
                <option>Spouse</option>
                <option>Friend</option>
                <option>Other</option>
              </select>
              <ErrorMessage name="lead.callingFor" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <ReasonForCall onChange={handleChange} onBlur={handleBlur} defaultValue={values.lead.reasonForCall} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <InquiryType onChange={handleChange} onBlur={handleBlur} defaultValue={values.lead.inquiryType} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <VeteranStatus onChange={handleChange} onBlur={handleBlur} defaultValue={values.lead.prospect.veteranStatus || ''} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <LeadSource key="leadsource"
              defaultLeadSource={values.lead.leadSource}
              defaultLeadSourceDetail={values.lead.leadSourceDetail}
              onChange={handleChange}
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
                value={values.lead.umid}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="UMID" />
              <ErrorMessage name="lead.umid" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Label for="callerType" className="label-format required-field">What is the gender of the caller?</Label>
            <select className="form-control" id="callerType" name="lead.callerType" onChange={this.props.handleChange} onBlur={this.props.handleBlur}>
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
            handleValidate={validateForm}
            handleReset={handleReset}
            isSubmitting={isSubmitting}
            setFieldTouched={setFieldTouched}
            errors={errors}
            isValid={isValid}
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
      const lead = await salesService.submitToService({ ...values });
      setStatus({
        successful: true,
        readOnly: true, 
      })
      this.setFieldValue('lead', lead)
    }
    catch(err) {  
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
