import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { Select } from '../../formik-inputs';

const resultOfCallArray = [
  { value: 1, label: 'Visit/Assessment/Home Visit Scheduled' },
  { value: 2, label: 'New Lead No Visit' },
  { value: 3, label: 'Nonqualified Lead' },
  { value: 4, label: 'Non Lead Call' },
  { value: 5, label: 'Special Event RSVP' },
  { value: 6, label: 'Webform No Response' },
];
const resultOfCallOptions = resultOfCallArray.map(result => {
  return <option key={result.value} value={result.label}>{result.label}</option>;
});

export const ResultOfCall = ({ basePath, locked = false }) => {
  const name = `${basePath}.resultOfCall`;
  
  return (
    <FormGroup>
      <Label for={name} className="label-format required-field">Result of Call</Label>
      <Select name={name} disabled={locked}>
        {resultOfCallOptions}
      </Select>
    </FormGroup>
  )
}

ResultOfCall.propTypes = {
  basePath: PropTypes.string.isRequired,
  locked: PropTypes.bool,
}