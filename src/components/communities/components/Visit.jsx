import React, { Fragment } from 'react';
import { Col, FormGroup, Row, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import Note from '../../Note';
import { DateTimePicker, Select } from '../../formik-inputs';
import freeMealListings from '../../../constants/free-meal-listings';

const freeMealOptions = freeMealListings.map((optn) => {
  return <option key={optn.value} value={optn.label}>{optn.label}</option>
});

const freeMealFollowUpActions = new Set([
  "20", // Guest Stay
  "5", // Visit/Appt Scheduled
])

const Visit = ({ inputNames, followUpAction }) => (
  <Fragment>
    <Row>
      <Col md="4">
        <FormGroup>
          <Label for={inputNames.followupDate} className="label-format">Next Steps Date</Label>
          <DateTimePicker
            name={inputNames.followupDate}
            className="no-border form-control"
            disableClock={true}
            showWeekNumbers={true}
          />
        </FormGroup>
      </Col>
      <Col md="4" style={{ verticalAlign: 'bottom' }}>
          {
            freeMealFollowUpActions.has(followUpAction) ? (
              <FormGroup>
                <Label for={inputNames.freeMeal} className="label-format">Does this Visit include a Free Meal?</Label>
                <Select name={inputNames.freeMeal}>{freeMealOptions}</Select>
              </FormGroup>) : null
          }
      </Col>
    </Row>
    <Row>
      <Col>
        <Note
          labelId="followupNoteLabel"
          label="Description"
          id={inputNames.note}
          name={inputNames.note}
        />
      </Col>
    </Row>
  </Fragment>
);

Visit.propTypes = {
  inputNames: PropTypes.object,
  followUpAction: PropTypes.string,
}

export default Visit;