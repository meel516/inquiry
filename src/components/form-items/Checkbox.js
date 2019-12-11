import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import { Input } from '../formik-inputs';

export const Checkbox = ({ name, label, className, onChange, disabled = false }) => (
  <FormGroup check inline className={className} disabled={disabled}>
    <Label check>
      <Input type='checkbox' name={name} onChange={onChange} disabled={disabled}/>{` ${label}`}
    </Label>
  </FormGroup>
)

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}