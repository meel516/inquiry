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
            <Checkbox className='col-4' name={`${basePath}.${path}.walkerRegularly`} label='Regularly Uses Walker' />
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox className='col-4' name={`${basePath}.${path}.onePersTransfer`} label='1 Person Transfer' />
            <Checkbox className='col-4' name={`${basePath}.${path}.wheelchairRegularly`} label='Regularly Uses Wheelchair' />
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox className='col-4' name={`${basePath}.${path}.twoPersTransfer`} label='2 Person Transfer' />
            <Checkbox className='col-4' name={`${basePath}.${path}.caneRegularly`} label='Regularly Uses Cane' />
          </Col>
        </Row>
    </StyledCheckboxGroupWrapper>
)

MobilityConcerns.propTypes = {
    basePath: PropTypes.string.isRequired,
}