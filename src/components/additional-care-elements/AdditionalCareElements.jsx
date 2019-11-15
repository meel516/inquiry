import React, { useState, useCallback } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import Select from 'react-select';
import PropTypes from 'prop-types'
import { CurrentSituation } from './components/CurrentSituation';
import { MobilityConcerns, MemoryConcerns, NutritionConcerns } from '../checkbox-groups';

const MEMORY_CONCERNS = 1;
const MOBILITY_CONCERNS = 2;
const NUTRITION_CONCERNS = 3;
const CURRENT_LIVING_SITUATION = 4;

const additionalCareElements = [
  { value: MEMORY_CONCERNS, label: 'Memory Concerns' },
  { value: MOBILITY_CONCERNS, label: 'Mobility Concerns' },
  { value: NUTRITION_CONCERNS, label: 'Nutrition Concerns' },
  { value: CURRENT_LIVING_SITUATION, label: 'Current Living Situation' },
];

export const AdditionalCareElements = ({ basePath, isReadOnly }) => {
  const [ selections, setSelections ] = useState(new Set());
  const handleAdditionalCareChange = useCallback((currentSelections) => {
    const elements = currentSelections ? currentSelections.map(q => q.value) : [];
    setSelections(new Set(elements));
  }, [setSelections]);

  return (
    <>
      <Row>
        <Col>
          <FormGroup>
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
      { selections.has(MEMORY_CONCERNS) ? <MemoryConcerns basePath={basePath} /> : null }
      { selections.has(MOBILITY_CONCERNS) ? <MobilityConcerns basePath={basePath} /> : null }
      { selections.has(NUTRITION_CONCERNS) ? <NutritionConcerns basePath={basePath} /> : null }
      { selections.has(CURRENT_LIVING_SITUATION) ? <CurrentSituation basePath={basePath} /> : null }
    </>
  )
}

AdditionalCareElements.propTypes = {
  basePath: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
}