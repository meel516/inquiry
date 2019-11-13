import React, { useEffect, useState, useMemo } from 'react'
import { Col, FormGroup, Label, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import { getAddressStates } from '../services/dropdowns'
import { Input, Select } from './formik-inputs';


export const Address = ({ basePath, locked = false }) => {
  const [ states, setStates ] = useState([]);

  useEffect(() => {
    getAddressStates()
      .then((data) => setStates(data));
  }, [setStates]);

  const inputNames = useMemo(() => {
    return {
      lineone: `${basePath}.address.line1`,
      linetwo: `${basePath}.address.line2`,
      city: `${basePath}.address.city`,
      state: `${basePath}.address.state`,
      zip: `${basePath}.address.zip`,
    }
  }, [basePath]);

  const stateOptions = useMemo(() => {
    return states.map((state) => {
      return <option key={state.value} value={state.value}>{state.text}</option>
    });
  }, [states]);

  return (
    <section className="Address">
      <Row>
        <Col>
          <FormGroup>
            <Label htmlFor={inputNames.lineone} className="label-format">Address 1</Label>
            <Input 
              type="text" 
              name={inputNames.lineone}
              placeholder="Street Address"
              disabled={locked}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for={inputNames.linetwo} className="label-format">Address 2</Label>
            <Input 
              type="text" 
              name={inputNames.linetwo}
              placeholder="Apartment, Studio, or Floor"
              disabled={locked}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.city} className="label-format">City</Label>
            <Input 
              type="text" 
              name={inputNames.city}
              placeholder="City"
              disabled={locked}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for={inputNames.state} className="label-format">State</Label>
            <Select name={inputNames.state} disabled={locked} >
              <option value="">Select One</option>
              {stateOptions}
            </Select>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for={inputNames.zip} className="label-format">Zip</Label>
            <Input 
              type="number" 
              name={inputNames.zip} 
              placeholder="Zip"
              disabled={locked}
            />
          </FormGroup>
        </Col>
      </Row>
    </section>
  );
}

Address.propTypes = {
  basePath: PropTypes.string.isRequired,
  locked: PropTypes.bool,
}