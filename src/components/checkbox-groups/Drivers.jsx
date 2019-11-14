import React from 'react'
import { Col, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { Checkbox } from '../form-items/Checkbox';

export const Drivers = ({ basePath, isReadOnly }) => {
  const rootPath = basePath ? `${basePath}.` : '';

  return (
    <section className="drivers">
      <Label for="drivers" className="label-format">Drivers</Label>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}activities`} label='Activities' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}accessToResidents`} label='Access to Residents' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}ageInPlace`} label='Age in Place' className='col-3' disabled={isReadOnly} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}care`} label='Care' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}location`} label='Location' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}peaceOfMind`} label='Peace of mind' className='col-3' disabled={isReadOnly} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}petFriendly`} label='Pet friendly' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}safety`} label='Safety' className='col-4' disabled={isReadOnly} />
        </Col>
      </Row>
    </section>
)
}

Drivers.propTypes = {
  basePath: PropTypes.string,
  isReadOnly: PropTypes.bool,
}

Drivers.defaultProps = {
  isReadOnly: false,
}