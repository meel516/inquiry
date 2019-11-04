import React from 'react';
import { Alert, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types'

const resultOfCallOptionsArray = [
  { value: 1, label: 'Visit/Assessment/Home Visit Scheduled' },
  { value: 2, label: 'New Lead No Visit' },
  { value: 3, label: 'Nonqualified Lead' },
  { value: 4, label: 'Non Lead Call' },
  { value: 5, label: 'Special Event RSVP' },
  { value: 6, label: 'Webform No Response' },
]

export default function ResultOfCall(props) {
    return (
      <FormGroup>
        <Label for="resultOfCall" id="resultOfCallLabel" className="label-format required-field">Result of Call</Label>
        <Input 
          type="select" 
          id="resultOfCall" 
          name='lead.resultOfCall' 
          onChange={props.handleChange} 
          onBlur={props.handleBlur} 
          disabled={props.isReadOnly}
        >
          <option value="">Select One</option>
          {resultOfCallOptionsArray.map((optn) => {
            return <option key={optn.value} value={optn.value}>{optn.label}</option>
          })}
        </Input>
        <ErrorMessage 
          name="lead.resultOfCall" 
          render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>}
        />
      </FormGroup>

    )
}

ResultOfCall.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

ResultOfCall.defaultProps = {
  isReadOnly: false,
}