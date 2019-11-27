import React from 'react';
import { Col, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { Checkbox } from '../form-items/Checkbox';
import { StyledCheckboxGroupWrapper } from './styled';

export const FinancialOptions = ({ basePath }) => {
  const rootPath = basePath ? `${basePath}.` : '';

  return (
    <StyledCheckboxGroupWrapper>
      <Label for="financialOptions" className="label-format">Financial Options</Label>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}aidAttendance`} label='Aid & Attendance' className='col-4' />
          <Checkbox name={`${rootPath}familyContributions`} label='Family Contributions' className='col-4' />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}homeOwner`} label='Home Owner' className='col-4' />
          <Checkbox name={`${rootPath}ltcPolicy`} label='LTC Policy' className='col-4' />
        </Col>
      </Row>
    </StyledCheckboxGroupWrapper>
  )
}

FinancialOptions.propTypes = {
  basePath: PropTypes.string.isRequired,
}