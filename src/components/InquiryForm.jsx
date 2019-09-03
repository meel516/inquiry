import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import queryString from 'query-string';

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

import Select from 'react-select';

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

export default class InquiryForm extends Component {
  constructor(props) {
    super(props);
    this.handleAddCommunity = this.handleAddCommunity.bind(this);
    this.handleVeteranStatusChange = this.handleVeteranStatusChange.bind(this);

    this.handleContactChange = this.handleContactChange.bind(this);
    this.handleAddressChanges = this.handleAddressChanges.bind(this);
    this.handleLeadSourceChange = this.handleLeadSourceChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);

    this.handleLostClosed = this.handleLostClosed.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    var emptyLead = createEmptyLead();
    this.state = {
      communities: [],
      veteranStatus: null,
      lead: emptyLead,
    };
  }

  componentDidMount() {
    console.log('InquiryForm.componentDidMount()')

    const {lead} = queryString.parse(this.props.location.search);
    console.log(`COID: ${lead}`);

    var leadObj = null;
    if (lead) {
      createLeadById(lead)
      .then((data) => {
        this.setState({lead: data})
      })
      .catch(error => console.log(error));
    }
    else {
      var leadObj = createEmptyLead();
      this.setState({
        lead: leadObj,
      })
    }
  }

  handleContactChange(type, name, value) {
    console.log(`changing contact[${type}] property[${name}]=${value}`);
    const updatedLead = this.state.lead;
    const contact = updatedLead[type][name] = value;
    this.setState({
       lead: updatedLead,
     })
  }

  handleLeadSourceChange(name, value) {
    const {lead} = this.state;
    lead.leadSource[name] = value;
    this.setState({
       lead: lead,
    })
  }

  handleAddressChanges(type, name, value) {
    const {lead} = this.state;
    const contact = lead[type].address[name] = value;
    this.setState({
       lead: lead,
    })
  }

  handleNoteChange(name, value) {
    const {lead} = this.state.lead;
    lead.notes[name] = value;
    this.setState({
       lead: lead,
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
      communities.push(createCommunity())
      return {
        communities: communities
      }
    })
  }

  handleRemoveCommunity(index) {
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

  handleFormSubmit(event) {
    event.preventDefault();
    submitToService(this.lead, this.state.communities);
  }

  render () {
    const {lead} = this.state || {};
    const {influencer, prospect, secondPerson} = this.state.lead || {};

    return (
      <Form onSubmit={this.handleSubmit} className="inquiryForm">
        <section className="influencer-section">
          <Contact type="influencer" contact={influencer} onChange={this.handleContactChange} onValid={this.handleOnValidate}>
            <Address type="influencer" address={influencer.address} onChange={this.handleAddressChanges}/>
          </Contact>
          <br />
          <Row>
            <Col md="6">
              <Label for="callPrompt">What prompted their call?</Label>
              <Select
                options={whatPromptedTheirCall}
                />
            </Col>
          </Row>
        </section>
        <br />
        <section className="prospect-section">
          <Note label="Situation" id="situation" onChange={this.handleNoteChange}/>
          <Row>
            <Col>
              <ADLNeeds />
            </Col>
          </Row>
          <br/>
          <AdditionalCareElements />
          <br/>
          <Prospect contact={prospect} />
          <br/>
          <CareLevels />
          <br/>
          <Row>
            <Col>
              <Note label="Passions &amp; Personality" id="passionsPersonality" onChange={this.handleNoteChange}/>
            </Col>
          </Row>
        </section>
        { false &&<Row>
          <Col md="5">
            <TimeFrame />
          </Col>
        </Row>}
        <Row>
          <Col>
            <Note label="Financial Situation" id="financialSituation" onChange={this.handleNoteChange}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <Button color="primary" size="sm" aria-pressed="false" onClick={() => this.handleAddCommunity()} >Add Community</Button>
            {this.state.communities.map((community, index) => (
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
            <Note label="Additional Notes" id="additionalNotes" onChange={this.handleNoteChange}/>
          </Col>
        </Row>
        <br />
        <Drivers />
        <br />
        <SecondPerson contact={secondPerson} />
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
            <InquiryType />
    			</Col>
    		</Row>
        <Row>
  				<Col md="5">
            <VeteranStatus />
    			</Col>
    		</Row>
        <Row>
          <Col md="5">
            <InquiryLeadSource leadSource={lead.leadSource} onChange={this.handleLeadSourceChange}/>
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
        { false && <Row>
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
    		</Row>}
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
          <Button color="primary" size="sm" onClick={this.handleFormSubmit}>Submit</Button>{' '}
        </div>
     </Form>
   )
 }
}
