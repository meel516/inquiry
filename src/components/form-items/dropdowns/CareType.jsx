import React, { useEffect, useMemo, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types'
import { getCareTypes } from '../../../services/dropdowns'
import { Select } from '../../formik-inputs';

export const CareType = ({ basePath }) => {
  const [ careTypes, setCareTypes ] = useState([]);
  const name = `${basePath}.careType`;

  const careTypeOptions = useMemo(() => {
    return careTypes.map(type => {
      return <option key={type.value} value={type.value}>{type.text}</option>;
    })
  }, [careTypes]);

  useEffect(() => {
    getCareTypes()
      .then((data) => setCareTypes(data));
  }, [setCareTypes])

  return (
    <FormGroup>
      <Label for={name} className="label-format required-field">Care Level Recommended</Label>
      <Select name={name} placeholder='Select One'>
        {careTypeOptions}
      </Select>
    </FormGroup>
  )
}

CareType.propTypes = {
  basePath: PropTypes.string.isRequired,
}