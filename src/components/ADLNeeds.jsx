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


export const ADLNeeds = ({ basePath, isReadOnly }) => {
  const rootPath = basePath ? `${basePath}.` : '';

  return (
    <section className="adlNeeds">
      <Label for="adlNeeds" className="label-format">ADL Needs</Label>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}bathing`} label='Bathing' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}dressing`} label='Dressing' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}feeding`} label='Feeding' className='col-3' disabled={isReadOnly} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}incontinence`} label='Incontinence' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}medications`} label='Medications' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}toileting`} label='Toileting' className='col-3' disabled={isReadOnly} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}transferring`} label='Transferring' className='col-4' disabled={isReadOnly} />
        </Col>
      </Row>
    </section>
  )
}
ADLNeeds.propTypes = {
  basePath: PropTypes.string,
  isRequired: PropTypes.bool,
}
