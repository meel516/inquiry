import React, { useState, useCallback } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import Select from 'react-select';
import PropTypes from 'prop-types'
import { CurrentSituation } from './components/CurrentSituation';
import { MobilityConcerns, MemoryConcerns, NutritionConcerns } from '../checkbox-groups';
import { useFormikContext } from 'formik';
import { MEMORY_CONCERNS, MOBILITY_CONCERNS, NUTRITION_CONCERNS, CURRENT_LIVING_SITUATION, additionalCareElements } from '../../constants/default-additional-care-elements'

const resetToOriginalState = (priorState, currentState, basePath, setFieldValue) => {
  priorState.forEach((item) => {
    if (!currentState.has(item)) {
      const careElement = additionalCareElements[item - 1]
      setFieldValue(`${basePath}.${careElement.field}`, careElement.default)
    }
  })
}

export const AdditionalCareElements = ({ basePath, isReadOnly }) => {
  const [selections, setSelections] = useState(new Set());
  const { setFieldValue } = useFormikContext();

  const handleAdditionalCareChange = useCallback((currentSelections) => {
    const elements = currentSelections ? currentSelections.map(q => q.value) : [];
    const newSelections = new Set(elements);
    resetToOriginalState(selections, newSelections, basePath, setFieldValue)
    setSelections(newSelections);
  }, [setSelections, selections, basePath, setFieldValue]);

  return (
    <>
      <Row>
        <Col>
          <FormGroup id='additional-care-elements-discovered'>
            <Label className="label-format">Additional Care Elements Discovered</Label>
            <Select
              isMulti={true}
              name='additionalCareElements'
              onChange={handleAdditionalCareChange}
              options={additionalCareElements}
              isDisabled={isReadOnly}
            />
          </FormGroup>
        </Col>
      </Row>
      {selections.has(MEMORY_CONCERNS) ? <MemoryConcerns basePath={basePath} /> : null}
      {selections.has(MOBILITY_CONCERNS) ? <MobilityConcerns basePath={basePath} /> : null}
      {selections.has(NUTRITION_CONCERNS) ? <NutritionConcerns basePath={basePath} /> : null}
      {selections.has(CURRENT_LIVING_SITUATION) ? <CurrentSituation basePath={basePath} /> : null}
    </>
  )
}

AdditionalCareElements.propTypes = {
  basePath: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
}