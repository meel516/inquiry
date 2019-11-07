import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Input } from '../formik-inputs';

export const Checkbox = ({ name, label, className, disabled = false }) => (
    <FormGroup check inline className={className} disabled={disabled}>
      <Label check>
        <Input type='checkbox' name={name} />{` ${label}`}
      </Label>
    </FormGroup>
)