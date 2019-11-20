import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import { Select } from '../../formik-inputs';

export const CallingFor = ({ basePath, locked = false }) => {
    const path = `${basePath}.callingFor`;

    return (
        <FormGroup>
            <Label for={path} className="label-format required-field">I am calling for</Label>
            <Select name={path} disabled={locked}>
                <option>Myself</option>
                <option>Parent</option>
                <option>Spouse</option>
                <option>Friend</option>
                <option>Other</option>
            </Select>
        </FormGroup>
    )
}

CallingFor.propTypes = {
    basePath: PropTypes.string.isRequired,
    locked: PropTypes.bool,
}