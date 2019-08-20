import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';

import CareLevels from './CareLevels';
import CommunityForm from './CommunityForm';
import Contact from './Contact';
import Prospect from './Prospect';
import Address from './Address';
import Advisor from './Advisor';
import Note from './Note';
import TimeFrame from './TimeFrame';
import VeteranStatus from './VeteranStatus';
import FinancialOptions from './FinancialOptions';
import InquiryType from './InquiryType';
import InquiryLeadSource from './InquiryLeadSource';
import SecondPerson from './SecondPerson';
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
    };
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
   return (
    <Form onSubmit={this.handleSubmit} className="inquiryForm">
      <h2>Inquiry Form</h2>
      <hr />
      <Contact />
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
      <br />
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
      <Prospect />
      <br/>
  		<Row>
        <Col>
  				<Label for="careLevel">Care Level Recommended</Label>
					<select className="form-control" id="careLevel">
						<option></option>
						<option>Nurture</option>
						<option>Alzheimer's/Dementia</option>
						<option>Assisted Living</option>
					  <option>At Home</option>
          	<option value="BHS">BHS</option>
						<option>Hospice</option>
						<option>Independent Living</option>
						<option>Private Duty Home Care</option>
						<option>Rehab</option>
						<option>Skilled Nursing Care</option>
						<option>System Conversion</option>
					</select>
				</Col>
      </Row>
      <Row>
  			<Col>
          <Note label="Passions &amp; Personality" id="passionsPersonality" name="passionsPersonality"/>
				</Col>
      </Row>
      <Row>
				<Col md="5">
          <TimeFrame />
    		</Col>
    	</Row>
      <br />
      <Row>
				<Col>
          <Note label="Financial Situation" id="financialSituation" name="financialSituation" />
				</Col>
      </Row>
      <br />
      <Row>
  			<Col>
            <Button color="primary" size="sm" aria-pressed="false" onClick={() => this.handleAddCommunity()} >Add Community</Button>
            {this.state.communities.map((community, index) => (
              <CommunityForm key={index} community={community} remove={() =>this.handleRemoveCommunity(index)}/>
            ))}
          </Col>
      </Row>
      <br/>
      <hr />
      <FinancialOptions />
      <br/>
      <Row>
  			<Col>
          <Note label="Additional Notes" id="additionalNotes" name="additionalNotes" />
				</Col>
			</Row>
      <br />
      <Row>
        <Col>
          <Label for="drivers">Drivers</Label>
          <Row>
            <Col>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" id="activities" name="activities" value="" />{' '}
                  Activities
                </Label>
              </FormGroup>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" id="accessToResidents" name="accessToResidents" value="" />{' '}
                  Access to Residents
                </Label>
              </FormGroup>
              <FormGroup check inline className="col-3">
                <Label check>
                  <Input type="checkbox" id="ageInPlace" name="ageInPlace" value="" />{' '}
                  Age in Place
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" id="care" name="care" value="" />{' '}
                  Care
                </Label>
              </FormGroup>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" id="location" name="location" value="" />{' '}
                  Location
                </Label>
              </FormGroup>
              <FormGroup check inline className="col-3">
                <Label check>
                  <Input type="checkbox" id="peaceOfMind" name="peaceOfMind" value="" />{' '}
                  Peace of mind
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" id="petFriendly" name="petFriendly" value="" />{' '}
                  Pet friendly
                </Label>
              </FormGroup>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" id="safety" name="safety" value="" />{' '}
                  Safety
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <SecondPerson />
      <br />
      <Row>
  			<Col>
  				<Label for="timeframe">I am calling for*</Label>
  					<select className="form-control" id="timeframe">
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
            <Label for="timeframe">Reason for Call</Label>
  					<select className="form-control" id="timeframe">
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
          <Button color="warning" size="sm" onClick={this.handleLostClosed}>Lost/Closed</Button>
        </div>
     </Form>
   )
 }
}
