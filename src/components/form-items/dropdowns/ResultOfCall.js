import React, { useEffect, useMemo, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { getResultOfCall } from '../../../services/dropdowns';
import { Select } from '../../formik-inputs';

export const ResultOfCall = ({ basePath, locked = false }) => {
  const [ resultofcalls, setResultOfCalls ] = useState([]);
  const name = `${basePath}.resultOfCall`;
  
  const resultOfCallOptions = useMemo(() => {
    return resultofcalls.map(resultofcall => {
      return <option key={resultofcall.value} value={resultofcall.value}>{resultofcall.text}</option>
    })
  }, [resultofcalls]);

  useEffect(() => {
    getResultOfCall()
      .then(data => setResultOfCalls(data));
  }, [setResultOfCalls])

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