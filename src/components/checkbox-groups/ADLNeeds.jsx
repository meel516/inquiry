import React from 'react';
import { Col, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { Checkbox } from '../form-items/Checkbox';
import { StyledCheckboxGroupWrapper } from './styled';


export const ADLNeeds = ({ basePath }) => {
  const rootPath = basePath ? `${basePath}.` : '';

  return (
    <StyledCheckboxGroupWrapper>
      <Label for="adlNeeds" className="label-format">ADL Needs</Label>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}bathing`} label='Bathing' className='col-4' />
          <Checkbox name={`${rootPath}dressing`} label='Dressing' className='col-4' />
          <Checkbox name={`${rootPath}feeding`} label='Feeding' className='col-3' />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}incontinence`} label='Incontinence' className='col-4' />
          <Checkbox name={`${rootPath}medications`} label='Medications' className='col-4' />
          <Checkbox name={`${rootPath}toileting`} label='Toileting' className='col-3' />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}transferring`} label='Transferring' className='col-4' />
          <Checkbox name={`${rootPath}noAdlNeeds`} label='No ADL Assistance Needed' className='col-4' />
        </Col>
      </Row>
    </StyledCheckboxGroupWrapper>
  )
}
ADLNeeds.propTypes = {
  basePath: PropTypes.string,
}
