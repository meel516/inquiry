import React from 'react';
import { Col, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { Checkbox } from '../form-items/Checkbox';

export const FinancialOptions = ({ basePath, isReadOnly }) => {
  const rootPath = basePath ? `${basePath}.` : '';

  return (
    <section className="financialOptions">
      <Label for="financialOptions" className="label-format">Financial Options</Label>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}aidAttendance`} label='Aid & Attendance' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}familyContributions`} label='Family Contributions' className='col-4' disabled={isReadOnly} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}homeOwner`} label='Home Owner' className='col-4' disabled={isReadOnly} />
          <Checkbox name={`${rootPath}ltcPolicy`} label='LTC Policy' className='col-4' disabled={isReadOnly} />
        </Col>
      </Row>
    </section>
  )
}

FinancialOptions.propTypes = {
  basePath: PropTypes.string,
  isReadOnly: PropTypes.bool,
}

FinancialOptions.defaultProps = {
  isReadOnly: false,
}