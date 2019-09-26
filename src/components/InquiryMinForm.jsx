import React from 'react';
import { Alert, Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import queryString from 'query-string';
import { Formik, Form, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';

import AdditionalCareElements from './AdditionalCareElements';
import Address from './Address';
import ADLNeeds from './ADLNeeds';
import CareType from './CareType';
import CommunitySelect from './CommunitySelect';
import Contact from './Contact';
import Drivers from './Drivers';
import FinancialOptions from './FinancialOptions';
import InquiryType from './InquiryType';
import LeadSource from './LeadSource';
import NextSteps from './NextSteps'
import Note from './Note';
import Prospect from './Prospect';
import ReasonForCall from './ReasonForCall';
import SecondPerson from './SecondPerson';
import VeteranStatus from './VeteranStatus';

import { createEmptyLead, createLeadById, submitToService } from "../services/SalesServices";
import { createCommunity } from '../services/CommunityServices';

class InquiryForm extends React.Component {
  state = {
    communities: [],
    lead: createEmptyLead(),
    debug: false,
  };

  componentDidMount() {
    const { lead, debug } = queryString.parse(this.props.location.search);
    console.log(`COID: ${lead}`);

    var leadObj = null;
    if (lead) {
      createLeadById(lead)
        .then((data) => {
          this.setState({
            lead: data,
            debug: debug
          })
        })
        .catch(error => console.log(error));
    }
    else {
      leadObj = createEmptyLead();
      this.setState({
        lead: leadObj,
        debug: debug,
      })
    }
  }

  handleAddCommunity = (values) => {
    this.setState((state) => {
      console.log(state);
      let communities = state.communities;
      values.communities.push(createCommunity())
      return {
        communities: communities
      }
    })
  }

  handleRemoveCommunity = (uuid, values) => {
    if (uuid !== undefined || uuid !== null) {
      let communities = (values.communities || []).filter((community) => (community.uuid !== uuid));
      this.setState({
        communities: communities
      })
      values.communities = communities || [];
    }
  }

  render() {

    const {
      values,
      status,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      setFieldValue,
      setFieldTouched,
      mapPropsToValues,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} className="inquiryForm">
        <section className="errors">
          <Row>
            {!!status &&
              <Alert color="danger">{status}</Alert>}
          </Row>
        </section>
        <section className="influencer-section">
          <Contact key="influencer-contact" type="influencer" contact={values.lead.influencer} onChange={this.props.handleChange} {...this.props}>
            <Address type="influencer" address={values.lead.influencer.address} onChange={this.props.handleChange} {...this.props} />
          </Contact>
        </section>
        <br />
        <section className="prospect-section">
          <Note labelId="situationLabel" label="Situation" id="situation" onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
          <Row>
            <Col>
              <ADLNeeds adlNeeds={values.lead.adlNeeds} {...this.props} />
            </Col>
          </Row>
          <br />
          <AdditionalCareElements {...this.props} />
          <br />
          <Prospect contact={this.props.values.lead.prospect} onChange={this.props.handleChange} {...this.props} />
          <br />
          <CareType onChange={handleChange} onBlur={handleBlur} {...this.props} />
          <br />
          <Row>
            <Col>
              <Note labelId="passionPersonalityLabel" label="Passions &amp; Personality" id="passionsPersonality" onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
            </Col>
          </Row>
        </section>
        <Row>
          <Col>
            <Note labelId="financialSituationLabel" label="Financial Situation" id="financialSituation" onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button color="primary" size="sm" aria-pressed="false" onClick={() => this.handleAddCommunity(values)}>Add Community</Button>
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
            <Note label="Additional Notes" id="additionalNotes" onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
          </Col>
        </Row>
        <br />
        <Drivers {...this.props} />
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
              <Label for="callingFor" className="label-format">I am calling for</Label>
              <select className="form-control" id="callingFor" name="lead.callingFor" onChange={handleChange} onBlur={handleBlur}>
                <option>Select One</option>
                <option>Myself</option>
                <option>Parent</option>
                <option>Spouse</option>
                <option>Friend</option>
                <option>Other</option>
              </select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <ReasonForCall onChange={handleChange} onBlur={handleBlur} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <InquiryType onChange={handleChange} onBlur={handleBlur} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <VeteranStatus onChange={handleChange} onBlur={handleBlur} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <LeadSource leadSource={this.props.values.lead.leadSource} onChange={this.props.handleChange} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <FormGroup>
              <Label for="umid" className="label-format">UMID</Label>
              <Input type="text" id="umid" placeholder="UMID" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Label for="callerType" className="label-format">What is the gender of the caller?</Label>
            <select className="form-control" id="callerType" name="lead.callerType" onChange={handleChange} onBlur={handleBlur}>
              <option>Select One</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="U">Unknown</option>
            </select>
          </Col>
        </Row>
        <br />

        <div className="float-right">
          <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>Submit</Button>{' '}
        </div>

        {this.state.debug &&
          <DebugFormikState {...this.props} />}

        {this.state.debug &&
          <DebugFormState {...this.state} />}

      </Form>
    );
  }
}

const EnhancedInquiryForm = withFormik({
  mapPropsToValues: () => {
    return {
      communities: [],
      lead: createEmptyLead(),
      debug: false,
      validationSchema: { SignupSchema },
    }
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'InquiryForm',

})(InquiryForm);

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  'lead.prospect.firstName': Yup.string()
    .min(2, 'Too Short!')
    .max(7, 'Too Long!')
    .required('Required'),
  'lead.prospect.lastName': Yup.string()
    .min(2, 'Too Short!')
    .max(7, 'Too Long!')
    .required('Required'),
  'lead.influencer.firstName': Yup.string()
    .min(2, 'Too Short!')
    .max(7, 'Too Long!')
    .required('Required'),
  'lead.influencer.lastName': Yup.string()
    .min(2, 'Too Short!')
    .max(7, 'Too Long!')
    .required('Required'),
  'lead.prospect.email': Yup.string()
    .email('Invalid email')
    .required('Required'),
  'lead.prospect.phone.number': Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
  'lead.influencer.phone.number': Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
});


const DebugFormikState = props =>
  <div style={{ margin: '1rem 0' }}>
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> ={' '}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>;

const DebugFormState = props =>
  <div style={{ margin: '1rem 0' }}>
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>state</strong> ={' '}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>;

export default EnhancedInquiryForm;

// const EnhancedInquiryForm = withFormik()
//
// });
