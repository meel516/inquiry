import React from 'react';
import {Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';

export default function FinancialOptions(props) {
  return (
    <Row>
      <Col>
        <Label for="fincialOptions">Financial Options</Label>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="aidAttendance" id="aidAttendance" value="" />{' '}
                Aid & Attendance
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="familyContribuations" id="familyContribuations" value="" />{' '}
                Family Contributions
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-3">
              <Label check>
                <Input type="checkbox" name="homeOwner" id="homeOwner" value="" />{' '}
                Home Owner
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" name="ltcPolicy" id="ltcPolicy" value="" />{' '}
                LTC Policy
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
