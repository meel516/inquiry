import React, { Component } from 'react';
import CareLevels from './CareLevels';
import CommunityForm from './CommunityForm';
import Contact from './Contact';
import Address from './Address';
import Advisor from './Advisor';
import {GetCallPrompts} from "../services/InquiryService";
import Select from 'react-select';

var Community = function() {

};

export default class InquiryForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddCommunity = this.handleAddCommunity.bind(this);

    this.state = {
      communities: [],
    };
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

  }

  handleSubmit(event) {
    console.log('handling form submit')
    event.preventDefault();
  }

  render () {
   return (
       <form onSubmit={this.handleSubmit} className="inquiryForm">
        <h2>Inquiry Form</h2>
        <hr />
        <Contact />
        <br/>
        <div class="row">
  				<div class="col-6">
  					<label for="callPrompt">What prompted their call?</label>
            <Select options={GetCallPrompts} />
  				</div>
  			</div>
        <div class="row">
  				<div class="col-10">
  					<label for="validationTextarea">Situation</label>
  					<textarea class="form-control" id="situation"></textarea>
  				</div>
  			</div>
        <Address />
        <div class="row">
  				<div class="col">
  					<label for="adlneeds">ADL Needs</label>
  					<input type="text" class="form-control" id="adlNeeds" placeholder="ADL Needs" />
  				</div>
  			</div>
        <div class="row">
  				<div class="col">
  					<label for="phone">Prospect Name</label>
  				</div>
  			</div>
  			<div class="row">
  				<div class="col">
  					<input type="text" class="form-control" placeholder="First name" />
  				</div>
  				<div class="col">
  					<input type="text" class="form-control" placeholder="Last name" />
  				</div>
  			</div>
  			<div class="row">
  				<div class="col">
  					<label for="dob">Date Of Birth</label>
  					<input type="text" class="form-control" id="dob" placeholder="Date Of Birth" />
  				</div>
  				<div class="col">
  					<label for="age">Age</label>
  					<input type="text" class="form-control" id="age" placeholder="Age" />
  				</div>
  			</div>
  			<div class="row">
  				<div class="col">
  					<label for="careLevel">Care Level Recommended</label>
  					<select class="form-control" id="careLevel">
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
  				</div>
  			</div>
        <div class="row">
  				<div class="col-10">
  					<label for="passionsPersonality">Passions &amp; Personality</label>
  					<textarea class="form-control" id="passionsPersonality"></textarea>
  				</div>
  			</div>
        <div class="row">
  				<div class="col">
  					<label for="timeframe">Timeframe</label>
  					<select class="form-control" id="timeframe">
  						<option></option>
  						<option>C Lead</option>
  						<option>B Lead</option>
              <option>A Lead</option>
    				</select>
    			</div>
    		</div>
        <div class="row">
  				<div class="col-10">
  					<label for="financialSituation">Financial Situation</label>
  					<textarea class="form-control" id="financialSituation"></textarea>
  				</div>
  			</div><br />
        <div class="row">
  				<div class="col">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-toggle="button"
              aria-pressed="false"
              autocomplete="off"
              onClick={() => this.handleAddCommunity()} >Add Community</button>
            {this.state.communities.map((community, index) => (
              <CommunityForm community={community} />
            ))}
          </div>
        </div>
        <br/><hr />
        <div class="row">
          <div class="col">
            <label for="fincialOptions">Financial Options</label>
            <div class="row">
              <div class="col">
                <div class="form-check form-check-inline col-4">
                  <input class="form-check-input" type="checkbox" value="" id="aidAttendance" />
                  <label class="form-check-label" for="aidAttendance">Aid & Attendance</label>
                </div>
                <div class="form-check form-check-inline col-4">
                  <input class="form-check-input" type="checkbox" value="" id="familyContribuations" />
                  <label class="form-check-label" for="familyContribuations">Family Contributions</label>
                </div>
                <div class="form-check form-check-inline col-3">
                  <input class="form-check-input" type="checkbox" value="" id="homeOwner" />
                  <label class="form-check-label" for="homeOwner">Home Owner</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-10">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" value="" id="ltcPolicy" />
                  <label class="form-check-label" for="ltcPolicy">LTC Policy</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
  				<div class="col-10">
            <label for="additionalNotes">Additional Notes</label>
  					<textarea class="form-control" id="additionalNotes"></textarea>
  				</div>
  			</div>
        <div class="row">
          <div class="col">
            <label for="drivers">Drivers</label>
            <div class="row">
              <div class="col">
                <div class="form-check form-check-inline col-4">
                  <input class="form-check-input" type="checkbox" value="" id="activities" />
                  <label class="form-check-label" for="activities">Activities</label>
                </div>
                <div class="form-check form-check-inline col-4">
                  <input class="form-check-input" type="checkbox" value="" id="accessToResidents" />
                  <label class="form-check-label" for="accessToResidents">Access to Residents</label>
                </div>
                <div class="form-check form-check-inline col-3">
                  <input class="form-check-input" type="checkbox" value="" id="ageInPlace" />
                  <label class="form-check-label" for="ageInPlace">Age in Place</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-check form-check-inline col-4">
                  <input class="form-check-input" type="checkbox" value="" id="care" />
                  <label class="form-check-label" for="care">Care</label>
                </div>
                <div class="form-check form-check-inline col-4">
                  <input class="form-check-input" type="checkbox" value="" id="location" />
                  <label class="form-check-label" for="location">Location</label>
                </div>
                <div class="form-check form-check-inline col-3">
                  <input class="form-check-input" type="checkbox" value="" id="peaceOfMind" />
                  <label class="form-check-label" for="peaceOfMind">Peace of mind</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-check form-check-inline col-4">
                  <input class="form-check-input" type="checkbox" value="" id="petFriendly" />
                  <label class="form-check-label" for="petFriendly">Pet friendly</label>
                </div>
                <div class="form-check form-check-inline col-4">
                  <input class="form-check-input" type="checkbox" value="" id="safety" />
                  <label class="form-check-label" for="safety">Safety</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="secondPerson" />
              <label for="secondPerson">Is there a 2nd Prospect?</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="nextSteps">Next Steps *</label>
  					<select class="form-control" id="nextSteps">
  						<option></option>
  						<option>Visit Scheduled</option>
  						<option>Home Visit Scheduled</option>
              <option>Assessment Scheduled</option>
              <option>Lead No Visit & Transfer to Community</option>
              <option>Event RSVP Transfer to Community</option>
              <option>First Call Left VM</option>
              <option>No Contact & Transfer to Community</option>
              <option>PPC No Contact & Transfer to Community</option>
              <option>Follow up Call to Schedule Appointment</option>
              <option>Non Qualified Interaction</option>
              <option>Back Office Entry Fee Lead</option>
              <option>Back Office Project Contellation</option>
              <option>Spanish Lead</option>
              <option>BHS Referral</option>
              <option>Large Employer Group - Non Senior Living Lead</option>
              <option>Professional Referral</option>
    				</select>
          </div>
        </div>
        <div class="row">
  				<div class="col">
  					<label for="timeframe">I am calling for*</label>
  					<select class="form-control" id="timeframe">
  						<option>Select One</option>
  						<option>Myself</option>
  						<option>Parent</option>
              <option>Spouse</option>
              <option>Friend</option>
              <option>Other</option>
    				</select>
    			</div>
    		</div>
        <div class="row">
  				<div class="col">
            <label for="timeframe">Reason for Call</label>
  					<select class="form-control" id="timeframe">
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
    			</div>
    		</div>
        <div class="row">
  				<div class="col">
  					<label for="inquiryType">Inquiry Type</label>
  					<select class="form-control" id="inquiryType">
  						<option>Select One</option>
  						<option>Call In</option>
  						<option>Chat</option>
              <option>Email</option>
              <option>Social Media</option>
    				</select>
    			</div>
    		</div>
        <div class="row">
  				<div class="col">
  					<label for="veterianstatus">Veteran Status</label>
  					<select class="form-control" id="veteranStatus">
  						<option>Select One</option>
  						<option>To Be Determined</option>
  						<option>Is a Veteran</option>
              <option>Is not a Veteran</option>
              <option>Spouse of a Veteran</option>
    				</select>
    			</div>
    		</div>
        <div class="row">
  				<div class="col">
            <label for="inquiryLeadSource">Inquiry Lead Source</label>
  					<select class="form-control" id="inquiryLeadSource">
  						<option>Select One</option>
  						<option>Advertising (Local)</option>
  						<option>Advertising (National)</option>
              <option>Internet</option>
              <option>Media/Public Relations Event</option>
              <option>National Contract</option>
              <option>Social Media</option>
              <option>Special Event at Community</option>
              <option>Special Event Off-Site</option>
    				</select>
    			</div>
    		</div>
        <div class="row">
  				<div class="col">
            <label for="inquiryLeadSourceDetail">Inquiry Lead Source Detail</label>
  					<select class="form-control" id="inquiryLeadSourceDetail">
  						<option>Select One</option>
  						<option>Dignity Memorial</option>
  						<option>Collateral (Local)</option>
              <option>Direct Mail (Local)</option>
              <option>Direct Mail (National)</option>
              <option>Eblast (Local)</option>
              <option>Eblast (National)</option>
              <option>Emma Blast</option>
              <option>Television/Cable</option>
              <option>YouTube</option>
              <option>Facebook</option>
              <option>Brookdale Website</option>
              <option>PPC</option>
              <option>Philips PERS</option>
              <option>Directory/Guide</option>
              <option>Newspaper (Local)</option>
              <option>Newspaper (National)</option>
              <option>Billboard (Local)</option>
              <option>Radio</option>
              <option>Magazine Ad (National)</option>
    				</select>
    			</div>
    		</div>
        <div class="row">
  				<div class="col">
  					<label for="additionalDetail">Additional Detail</label>
  					<input type="text" class="form-control" id="additionalDetail" />
				  </div>
        </div>
        <div class="row">
  				<div class="col">
  					<label for="ininid">ININ ID*</label>
            <input type="text" class="form-control" id="ininid" />
				  </div>
        </div>
        <div class="row">
  				<div class="col">
  					<label for="attemptNumber">Attempt Number*</label>
  					<select class="form-control" id="attemptNumber">
  						<option>Select One</option>
  						<option>1st</option>
  						<option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
              <option>5th</option>
              <option>6th</option>
    				</select>
    			</div>
    		</div>
        <br />
        <Advisor />
        <br />
        <div class="row">
  				<div class="col">
  					<label for="callerType">What is the gender of the caller?*</label>
  					<select class="form-control" id="callerType">
  						<option>Select One</option>
  						<option>Male</option>
  						<option>Female</option>
    				</select>
    			</div>
    		</div>
        <br />
        <div class="float-right">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
       </form>
   )
 }
}
