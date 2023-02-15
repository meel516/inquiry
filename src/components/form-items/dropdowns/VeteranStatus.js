import React, { useEffect, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { getVeteranStatus } from '../../../services/dropdowns';
import { Select } from '../../formik-inputs';

export const VeteranStatus = ({ basePath, locked = false }) => {
  const [ statuses, setStatuses ] = useState([]);
  const name = `${basePath}.veteranStatus`;

  useEffect(() => {
    async function loadStatuses() {
      try {
        const data = await getVeteranStatus();

        setStatuses(data.map(status => <option key={status.value} value={status.value}>{status.text}</option>));
      } catch (e) {
        console.log("Caught error loading statuses", e);
      }
    }

    loadStatuses();
  }, [setStatuses]);

  return (
    <FormGroup>
      <Label for={name} className="label-format required-field">Veteran Status</Label>
      <Select name={name} disabled={locked}>
        {statuses}
      </Select>
    </FormGroup>
  )
};

VeteranStatus.propTypes = {
  basePath: PropTypes.string.isRequired,
  locked: PropTypes.bool,
};