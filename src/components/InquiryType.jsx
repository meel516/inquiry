import React, { useEffect, useMemo, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { getInquiryTypes } from '../services/dropdowns';
import { Select } from './formik-inputs';

export const InquiryType = ({ name, locked = false }) => {
  const [ inquiryTypes, setInquiryTypes ] = useState([]);

  const inquiryTypeOptions = useMemo(() => {
    return inquiryTypes.map(type => {
      return <option key={type.value} value={type.value}>{type.text}</option>;
    })
  }, [inquiryTypes]);

  useEffect(() => {
    getInquiryTypes()
      .then((data) => setInquiryTypes(data));
  }, [setInquiryTypes]);

  return (
    <FormGroup>
      <Label for={name} className="label-format required-field">Inquiry Method</Label>
      <Select name={name} disabled={locked} placeholder='Select One'>
        {inquiryTypeOptions}
      </Select>
    </FormGroup>
  )
}

InquiryType.propTypes = {
  name: PropTypes.string.isRequired,
  locked: PropTypes.bool,
}