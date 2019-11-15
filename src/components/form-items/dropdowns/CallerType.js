import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import { Select } from '../../formik-inputs';

export const CallerType = ({ basePath, locked = false }) => {
    const path = `${basePath}.callerType`;

    return (
        <FormGroup>
            <Label for={path} className="label-format required-field">What is the gender of the caller?</Label>
            <Select name={path} disabled={locked} placeholder="Select One">
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="U">Unknown</option>
            </Select>
        </FormGroup>
    )
}

CallerType.propTypes = {
    basePath: PropTypes.string.isRequired,
    locked: PropTypes.bool,
}