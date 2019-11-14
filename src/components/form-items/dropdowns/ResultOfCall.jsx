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
  return <option key={result.value} value={result.value}>{result.label}</option>;
});

export const ResultOfCall = ({ basePath }) => {
  const name = `${basePath}.resultOfCall`;
  
  return (
    <FormGroup>
      <Label for={name} className="label-format required-field">Result of Call</Label>
      <Select name={name} placeholder='Select One'>
        {resultOfCallOptions}
      </Select>
    </FormGroup>
  )
}

ResultOfCall.propTypes = {
  basePath: PropTypes.string.isRequired,
}