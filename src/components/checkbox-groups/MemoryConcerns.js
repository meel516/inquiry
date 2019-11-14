import React from 'react';
import PropTypes from 'prop-types';
import { Col, Label, Row } from 'reactstrap';
import { Checkbox } from '../form-items';

const path = 'memoryConcerns';

export const MemoryConcerns = ({ basePath }) => (
    <section >
        <Label className="label-format">Memory Concerns</Label>
        <Row>
          <Col>
            <Checkbox className='col-4' name={`${basePath}.${path}.dementia`} label="Alzheimer's or Dementia Diagnosis" />
            <Checkbox className='col-4' name={`${basePath}.${path}.memoryLoss`} label='Argumentative Caused by Memory Loss' />
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox className='col-4' name={`${basePath}.${path}.repeatsStories`} label="Regularly Forgets Things or Repeats Stories" />
            <Checkbox className='col-4' name={`${basePath}.${path}.wandering`} label='Wandering' />
          </Col>
        </Row>
    </section>
)

MemoryConcerns.propTypes = {
    basePath: PropTypes.string.isRequired,
}