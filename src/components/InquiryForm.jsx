import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';

import AdditionalCareElements from './AdditionalCareElements';
import Address from './Address';
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

import InquiryService from "../services/InquiryService";

import Select from 'react-select';

var Community = function(index) {

};

export default class InquiryForm extends Component {
  constructor(props) {
    super(props);
    this.handleAddCommunity = this.handleAddCommunity.bind(this);
    this.handleVeteranStatusChange = this.handleVeteranStatusChange.bind(this);

    this.handleLostClosed = this.handleLostClosed.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      communities: [],
      veteranStatus: null,
      lead: {},
    };
  }

  componentDidMount() {
    console.log('InquiryForm.componentDidMount()')
    const emptyLead = {
      influencer: {
        firstName: "",
        lastName: "",
      },
      secondPerson: {
        firstName: "",
        lastName: "",
      },
      prospect: {
        firstName: "",
        lastName: "",
      }
    };

    this.setState({
      lead: emptyLead,
    })
  }

  handleVeteranStatusChange(option) {
    this.setState({
      veteranStatus: option.value,
    })
  }

  handleAddCommunity() {
    this.setState((state) => {
      let communities = state.communities;
      communities.push(new Community(communities.length))
      return {
        communities: communities
      }
    })
  }

  handleRemoveCommunity(index) {
    console.log(`removing community[${index}]`)
    this.setState((state) => {
      let communities = state.communities;
      communities.splice(index, 1)
      return {
        communities: communities
      }
    })
  }

  handleLostClosed(event) {
    console.log('handling lost closed event')
    event.preventDefault();
  }

  handleSubmit(event) {
    console.log('handling form submission')
    event.preventDefault();
  }

  render () {
    const {lead} = this.state
    const {influencer, prospect, secondPerson} = lead;
    console.log(`${JSON.stringify(lead)}`)
    return (
      <Form onSubmit={this.handleSubmit} className="inquiryForm">
        <h2>Inquiry Form</h2>
        <hr />
        <section className="influencer-section">
          <Contact name="influencer" contact={influencer} />
          <br />
            <Address />
          <br/>
          <Row>
            <Col md="6">
              <Label for="callPrompt">What prompted their call?</Label>
              <Select
                options={InquiryService.retrieveCallPrompts}
                />
            </Col>
          </Row>
        </section>
        <br />
        <section className="prospect-section">
          <Note label="Situation" id="situation" name="situation"/>
          <Row>
            <Col>
              <FormGroup>
                <Label for="adlneeds">ADL Needs</Label>
                <Input type="text" id="adlNeeds" placeholder="ADL Needs" />
              </FormGroup>
            </Col>
          </Row>
          <br/>
          <AdditionalCareElements />
          <br/>
          {  false && <Prospect contact={prospect} />
          }
          <br/>
          <CareLevels />
          <br/>
          <Row>
            <Col>
              <Note label="Passions &amp; Personality" id="passionsPersonality" name="passionsPersonality"/>
            </Col>
          </Row>
        </section>
        <Row>
          <Col md="5">
            <TimeFrame />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Note label="Financial Situation" id="financialSituation" />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <Button color="primary" size="sm" aria-pressed="false" onClick={() => this.handleAddCommunity()} >Add Community</Button>
            {this.state.communities.map((community, index) => (
              <CommunitySelect key={index} community={community} remove={() =>this.handleRemoveCommunity(index)}/>
            ))}
          </Col>
        </Row>
        <br/>
        <hr />
        <FinancialOptions />
        <br/>
        <Row>
          <Col>
            <Note label="Additional Notes" id="additionalNotes" />
          </Col>
        </Row>
        <br />
        <Drivers />
        <br />
        { false && <SecondPerson contact={secondPerson} />
        }
        <br />
        <Row>
          <Col>
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
  				<Col>
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
  				<Col>
            <InquiryType />
    			</Col>
    		</Row>
        <Row>
  				<Col>
            <VeteranStatus />
    			</Col>
    		</Row>
        <InquiryLeadSource />
        <Row>
  				<Col>
            <FormGroup>
    					<Label for="ininid">UMID*</Label>
              <Input type="text" id="ininid" />
            </FormGroup>
				  </Col>
        </Row>
        <Row>
  				<Col>
  					<Label for="attemptNumber">Attempt Number*</Label>
  					<select className="form-control" id="attemptNumber">
  						<option>Select One</option>
  						<option>1st</option>
  						<option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
              <option>5th</option>
              <option>6th</option>
    				</select>
    			</Col>
    		</Row>
        <br />
        <Advisor />
        <br />
        <Row>
  				<Col>
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
          <Button color="primary" size="sm" onClick={this.handleSubmit}>Submit</Button>{' '}
        </div>
     </Form>
   )
 }
}
