import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';

const nextStepsOptionsArray = [
  { value: 1, label: 'Visit/Assessment/Home Visit Scheduled' },
  { value: 2, label: 'New Lead No Visit' },
  { value: 3, label: 'Nonqualified Lead' },
  { value: 4, label: 'Non Lead Call' },
  { value: 5, label: 'Webform No Response' },
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
        <Label for="nextSteps" id="nextStepsLabel" className="label-format">Result of Call</Label>
        <Input type="select" id="nextSteps" name='lead.fua' onChange={this.props.handleChange} onBlur={this.props.onBlur} >
          <option value="">Select One</option>
          {nextStepsOptions}
        </Input>
        <ErrorMessage name="lead.fua" component="div"/>
      </FormGroup>

    )
  };
}


