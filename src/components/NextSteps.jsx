import React from 'react';
import { Alert, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';

const nextStepsOptionsArray = [
  { value: 1, label: 'Visit/Assessment/Home Visit Scheduled' },
  { value: 2, label: 'New Lead No Visit' },
  { value: 3, label: 'Nonqualified Lead' },
  { value: 4, label: 'Non Lead Call' },
  { value: 5, label: 'Webform No Response' },
]

export default function NextStepsSelect(props) {
    const nextStepsOptions = (nextStepsOptionsArray || []).map(type => {
      return <option key={type.value} value={type.value}>{type.label}</option>
    });

    return (
      <FormGroup>
        <Label for="nextSteps" id="nextStepsLabel" className="label-format required-field">Result of Call</Label>
        <Input type="select" id="nextSteps" name='lead.fua' onChange={props.handleChange} onBlur={props.onBlur} >
          <option value="">Select One</option>
          {nextStepsOptions}
        </Input>
        <ErrorMessage name="lead.fua" render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>}/>
      </FormGroup>

    )
}

