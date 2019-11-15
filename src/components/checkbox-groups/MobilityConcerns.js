import React from 'react';
import PropTypes from 'prop-types';
import { Col, Label, Row } from 'reactstrap';
import { Checkbox } from '../form-items';
import { StyledCheckboxGroupWrapper } from './styled';

const path = 'mobilityConcerns';

export const MobilityConcerns = ({ basePath }) => (
    <StyledCheckboxGroupWrapper>
        <Label className="label-format">Mobility Concerns</Label>
        <Row>
          <Col>
            <Checkbox className='col-4' name={`${basePath}.${path}.fallRisk`} label='Fall Risk' />
            <Checkbox className='col-4' name={`${basePath}.${path}.regularlyWalks`} label='Regularly Uses Walker' />
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox className='col-4' name={`${basePath}.${path}.personTransfer`} label='1 Person Transfer' />
            <Checkbox className='col-4' name={`${basePath}.${path}.usesWheelChair`} label='Regularly Uses Wheelchair' />
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox className='col-4' name={`${basePath}.${path}.secondPersonTransfer`} label='2 Person Transfer' />
            <Checkbox className='col-4' name={`${basePath}.${path}.usesCane`} label='Regularly Uses Cane' />
          </Col>
        </Row>
    </StyledCheckboxGroupWrapper>
)

MobilityConcerns.propTypes = {
    basePath: PropTypes.string.isRequired,
}