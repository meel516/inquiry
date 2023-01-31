import React from 'react'
import { Col, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { Checkbox } from '../form-items';
import { StyledCheckboxGroupWrapper } from './styled';
import {StyledErrorMessage} from '../../styled';

export const Drivers = ({
                          basePath,
                          formikErrors,
                        }) => {
  const rootPath = basePath ? `${basePath}.` : '';

  let errorMessage = null;

  if (formikErrors?.lead?.drivers) {
    errorMessage = <StyledErrorMessage>{formikErrors?.lead?.drivers}</StyledErrorMessage>;
  }

  return (
    <StyledCheckboxGroupWrapper>
      <Label for="drivers" className="label-format  required-field">Drivers</Label>
        { errorMessage }
      <Row>
        <Col>
          <Checkbox name={`${rootPath}activities`} label='Activities' className='col-4' />
          <Checkbox name={`${rootPath}accessToResidents`} label='Access to Residents' className='col-4' />
          <Checkbox name={`${rootPath}ageInPlace`} label='Age in Place' className='col-3' />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}care`} label='Care' className='col-4' />
          <Checkbox name={`${rootPath}location`} label='Location' className='col-4' />
          <Checkbox name={`${rootPath}peaceOfMind`} label='Peace of mind' className='col-3' />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox name={`${rootPath}petFriendly`} label='Pet friendly' className='col-4' />
          <Checkbox name={`${rootPath}safety`} label='Safety' className='col-4' />
          <Checkbox name={`${rootPath}didNotDiscloseDriver`} label='Did Not Disclose' className='col-3' />
        </Col>
      </Row>
    </StyledCheckboxGroupWrapper>
  );
};

Drivers.propTypes = {
  basePath:     PropTypes.string,
  formikErrors: PropTypes.object,
};

Drivers.defaultProps = {
};
