import React, { useEffect, useMemo, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { getReasonForInterest } from '../services/dropdowns';
import { Select } from './formik-inputs';

export const ReasonForCall = ({ basePath }) => {
  const [ reasons, setReasons ] = useState([]);
  const name = `${basePath}.reasonForCall`;

  const reasonsOptions = useMemo(() => {
    return reasons.map(reason => {
      return <option key={reason.value} value={reason.value}>{reason.text}</option>
    })
  }, [reasons]);

  useEffect(() => {
    getReasonForInterest()
      .then(data => setReasons(data));
  }, [setReasons])

  return (
    <FormGroup>
        <Label for="reasonForCall" className="label-format">Reason for Call</Label>
        <Select name={name} placeholder='Select One'>
          {reasonsOptions}
        </Select>
      </FormGroup>
  )
}

ReasonForCall.propTypes = {
  basePath: PropTypes.string.isRequired,
}