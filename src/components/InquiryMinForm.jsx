import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import queryString from 'query-string';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

import AdditionalCareElements from './AdditionalCareElements';
import Address from './Address';
import ADLNeeds from './ADLNeeds';
import Advisor from './Advisor';
import CareLevels from './CareLevels';
import CommunitySelect from './CommunitySelect';
import Contact from './Contact';
import Drivers from './Drivers';
import Prospect from './Prospect';
import Note from './Note';
import TimeFrame from './TimeFrame';
import FinancialOptions from './FinancialOptions';
import InquiryType from './InquiryType';
import InquiryLeadSource from './InquiryLeadSource';
import SecondPerson from './SecondPerson';
import VeteranStatus from './VeteranStatus';

import {createEmptyLead, createLeadById, retrieveCallPrompts, submitToService} from "../services/SalesServices";
import {createCommunity} from '../services/CommunityServices';

const whatPromptedTheirCall = [
  {value: 1, label: 'Age and Need of Care'},
  {value: 2, label: 'Death of Spouse'},
  {value: 3, label: 'Downsizing'},
  {value: 4, label: 'Memory Concerns'},
  {value: 5, label: 'No Longer able to Care for Loved One at Home'},
  {value: 6, label: 'Recent Hospital Visit - Doctor Recommendation'},
  {value: 7, label: 'Response to Marketing Material'},
  {value: 8, label: 'Relocation'},
];

export default class InquiryForm extends React.Component {
  state = {
    communities: [],
    lead: createEmptyLead(),
    debug: false,
  };

  componentDidMount() {
    const {lead, debug} = queryString.parse(this.props.location.search);
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
      var leadObj = createEmptyLead();
      this.setState({
        lead: leadObj,
        debug: debug,
      })
    }
  }

  handleAddCommunity = () => {
    this.setState((state) => {
      let communities = state.communities;
      communities.push(createCommunity())
      return {
        communities: communities
      }
    })
  }

  handleRemoveCommunity = (index) => {
    this.setState((state) => {
      let communities = state.communities;
      communities.splice(index, 1)
      return {
        communities: communities
      }
    })
  }

  render() {
    console.log(`Debugging is : ${this.state.debug}`)
    return (
      <Formik
        initialValues={{...this.state}}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          actions.validateForm();
          submitToService({...values, actions});
        }}
        validationSchema={Yup.object().shape({
          "lead.influencer.email": Yup.string().email(),
        })}>
        {props => {
          const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <Form onSubmit={handleSubmit} className="inquiryForm">
            <section className="influencer-section">
              <Contact type="influencer" contact={props.values.lead.influencer} onChange={props.handleChange} {...props}>
                <Address type="influencer" address={props.values.lead.influencer.address} onChange={props.handleChange} {...props}/>
              </Contact>
              <br />
              {false && <Row>
                <Col md="6">
                  <Label for="callPrompt">What prompted their call?</Label>
                  <Select
                    options={whatPromptedTheirCall}
                    />
                </Col>
              </Row>}
            </section>
            <br />
            <section className="prospect-section">
              <Note label="Situation" id="situation" onChange={props.handleChange}/>
              <Row>
                <Col>
                  <ADLNeeds />
                </Col>
              </Row>
              <br/>
              <AdditionalCareElements />
              <br/>
              <Prospect contact={props.values.lead.prospect} onChange={props.handleChange} {...props}/>
              <br/>
              <CareLevels onChange={props.handleChange}/>
              <br/>
              <Row>
                <Col>
                  <Note label="Passions &amp; Personality" id="passionsPersonality" onChange={props.handleChange}/>
                </Col>
              </Row>
            </section>
            <Row>
              <Col>
                <Note label="Financial Situation" id="financialSituation" onChange={props.handleChange}/>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <Button color="primary" size="sm" aria-pressed="false" onClick={() => this.handleAddCommunity()} >Add Community</Button>
                {props.values.communities.map((community, index) => (
                  <CommunitySelect key={index} community={community} onRemove={() =>this.handleRemoveCommunity(index)}/>
                ))}
              </Col>
            </Row>
            <br/>
            <hr />
            <FinancialOptions />
            <br/>
            <Row>
              <Col>
                <Note label="Additional Notes" id="additionalNotes" onChange={props.handleChange}/>
              </Col>
            </Row>
            <br />
            <Drivers />
            <br />
            <SecondPerson contact={props.values.lead.secondPerson} />
            <br />
            <Row>
              <Col md="4">
                <Label for="callingFor">I am calling for*</Label>
                <select className="form-control" id="callingFor">
                  <option>Select One</option>
                  <option>Myself</option>
                  <option>Parent</option>
                  <option>Spouse</option>
                  <option>Friend</option>
                  <option>Other</option>
                </select>
              </Col>
            </Row>
            <Row>
      				<Col md="5">
                <Label for="reasonForCall">Reason for Call</Label>
      					<select className="form-control" id="reasonForCall">
      						<option>Select One</option>
      						<option>Family Relocating</option>
      						<option>Financial Strain of Home Ownership</option>
                  <option>Health</option>
                  <option>Home Maintenance</option>
                  <option>Hospital Discharge</option>
                  <option>Location</option>
                  <option>Memory Care Needs</option>
                  <option>Nutrition Assistance</option>
                  <option>Prompted by Physician</option>
                  <option>Relocate Near Family</option>
                  <option>Relocate Near Friends</option>
                  <option>Respite</option>
                  <option>Security</option>
                  <option>Services</option>
                  <option>Skilled Nursing Discharge</option>
                  <option>Socialization/Life Enrichment</option>
                  <option>Transportation</option>
        				</select>
        			</Col>
        		</Row>
            <Row>
      				<Col md="5">
                <InquiryType onChange={props.handleChange}/>
        			</Col>
        		</Row>
            <Row>
      				<Col md="5">
                <VeteranStatus />
        			</Col>
        		</Row>
            <Row>
              <Col md="5">
                <InquiryLeadSource leadSource={props.values.lead.leadSource} onChange={props.handleChange}/>
              </Col>
            </Row>
            <Row>
      				<Col md="5">
                <FormGroup>
        					<Label for="ininid">UMID*</Label>
                  <Input type="text" id="ininid" />
                </FormGroup>
    				  </Col>
            </Row>
            <br />
            <Row>
      				<Col md="3">
      					<Label for="callerType">What is the gender of the caller?*</Label>
      					<select className="form-control" id="callerType">
      						<option>Select One</option>
      						<option>Male</option>
      						<option>Female</option>
        				</select>
        			</Col>
        		</Row>
            <br />

            <div className="float-right">
              <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>Submit</Button>{' '}
            </div>

            {this.state.debug && <DisplayFormikState {...props} />}

          </Form>
        );
      }}
      </Formik>
    )
  }
}


const DisplayFormikState = props =>
<div style={{ margin: '1rem 0' }}>
  <h3 style={{ fontFamily: 'monospace' }} />
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

// const InquiryFormSchema = Yup.object().shape({
//
// });
