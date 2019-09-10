import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const nextStepsOptions = [
  { value: 6, label: 'First Call Left VM' },
  { value: 8, label: 'PPC No Contact & Transfer to Community' },
  { value: 9, label: 'Follow up Call to Schedule Appointment' },
  { value: 10, label: 'Non Qualified Interaction' },
  { value: 11, label: 'Back Office Entry Fee Lead' },
  { value: 12, label: 'Back Office Project Contellation' },
  { value: 13, label: 'Spanish Lead' },
  { value: 14, label: 'BHS Referral' },
  { value: 15, label: 'Large Employer Group - Non Senior Living Lead' },
  { value: 16, label: 'Professional Referral' },
]

export default class NextStepsSelect extends React.Component {
  state = {
    selectedOption: null,
  }

  componentDidMount() {
    console.log('called componentDidMount on nextSteps form');
  }

  componentWillUnmount() {
    console.log('called componentWillUnmount on nextSteps form');
  }

  /**  */
  render() {
    const { handleChange} = this.props;
    const nextStepsOptns = (nextStepsOptions || []).map(type => {
      return <option key={type.value} value={type.value}>{type.label}</option>
    });

    return (
      <FormGroup>
        <Label for="nextSteps" className="label-format">Next Steps</Label>
        <Input type="select" id="nextsteps" name="nextSteps" onChange={handleChange}>
          <option value="">Select One</option>
          {nextStepsOptns}
        </Input>
      </FormGroup>

    )
  };
}


