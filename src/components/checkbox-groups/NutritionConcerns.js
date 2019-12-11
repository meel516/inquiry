import React from 'react';
import PropTypes from 'prop-types';
import { Col, Label, Row } from 'reactstrap';
import { Checkbox } from '../form-items';
import { StyledCheckboxGroupWrapper } from './styled';

const path = 'nutritionConcerns';

export const NutritionConcerns = ({ basePath }) => (
    <StyledCheckboxGroupWrapper>
        <Label className="label-format">Nutrition Concerns</Label>
        <Row>
            <Col>
                <Checkbox className='col-4' name={`${basePath}.${path}.diabetesDiagnosis`} label='Diabetes Diagnosis' />
                <Checkbox className='col-4' name={`${basePath}.${path}.lowSaltLowDiet`} label='Low Salt-Low Fat Diet Restrictions' />
            </Col>
        </Row>
        <Row>
            <Col>
                <Checkbox className='col-4' name={`${basePath}.${path}.otherDietRestrictions`} label='Other Prescribed Diet Restrictions' />
                <Checkbox className='col-4' name={`${basePath}.${path}.notEatingWell`} label='Not Eating Consistently or Well' />
            </Col>
        </Row>
    </StyledCheckboxGroupWrapper>
)

NutritionConcerns.propTypes = {
    basePath: PropTypes.string.isRequired,
}