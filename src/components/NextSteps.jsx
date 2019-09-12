import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const nextStepsOptionsArray = [
  { value: 1, label: 'Visit Scheduled' },
  { value: 2, label: 'Home Visit Scheduled' },
  { value: 3, label: 'Assessment Scheduled' },
  { value: 4, label: 'Lead No Visit & Recommend Community' },
  { value: 5, label: 'Event RSVP Recommend Community' },
  { value: 6, label: 'First Call Left VM' },
  { value: 7, label: 'No Contact & Recommend Community' },
  { value: 8, label: 'PPC No Contact & Recommend Community' },
  { value: 9, label: 'Follow up Call to Schedule Appointment' },
  { value: 10, label: 'Non Qualified Interaction' },
  { value: 11, label: 'Back Office Entry Fee Lead' },
  { value: 12, label: 'Large Employer Group - Non Senior Living Lead' },
  { value: 13, label: 'Professional Referral' },
]

export default class NextStepsSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = props.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('called componentDidMount on nextSteps form');
  }

  componentWillUnmount() {
    console.log('called componentWillUnmount on nextSteps form');
  }

  render() {
    const nextStepsOptions = (nextStepsOptionsArray || []).map(type => {
      return <option key={type.value} value={type.value}>{type.label}</option>
    });

    return (
      <FormGroup>
        <Label for="nextSteps" id="nextStepsLabel" className="label-format">Next Steps</Label>
        <Input type="select" id="nextSteps" name="lead.nextSteps" onChange={this.handleChange} onBlur={this.onBlur} >
          <option value="">Select One</option>
          {nextStepsOptions}
        </Input>
      </FormGroup>

    )
  };
}


