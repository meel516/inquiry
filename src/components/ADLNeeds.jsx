import React from 'react';
import { Input } from './formik-inputs';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'

const Checkbox = ({ name, label, className, disabled = false }) => (
  <FormGroup check inline className={className} disabled={disabled}>
    <Label check>
      <Input type='checkbox' name={name} />{` ${label}`}
    </Label>
  </FormGroup>
)


export const ADLNeeds = ({ basePath, isReadOnly }) => (
  <section className="adlNeeds">
    <Label for="adlNeeds" className="label-format">ADL Needs</Label>
    <Row>
      <Col>
        <Checkbox name={`${basePath}.bathing`} label='Bathing' className='col-4' disabled={isReadOnly} />
        <Checkbox name={`${basePath}.dressing`} label='Dressing' className='col-4' disabled={isReadOnly} />
        <Checkbox name={`${basePath}.feeding`} label='Feeding' className='col-3' disabled={isReadOnly} />
      </Col>
    </Row>
    <Row>
      <Col>
        <Checkbox name={`${basePath}.incontinence`} label='Incontinence' className='col-4' disabled={isReadOnly} />
        <Checkbox name={`${basePath}.medications`} label='Medications' className='col-4' disabled={isReadOnly} />
        <Checkbox name={`${basePath}.toileting`} label='Toileting' className='col-3' disabled={isReadOnly} />
      </Col>
    </Row>
    <Row>
      <Col>
        <Checkbox name={`${basePath}.transferring`} label='Transferring' className='col-4' disabled={isReadOnly} />
      </Col>
    </Row>
  </section>
)

ADLNeeds.propTypes = {
  basePath: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
}
