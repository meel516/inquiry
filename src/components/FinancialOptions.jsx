import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

export default function FinancialOptions(props) {
  return (
    <>
      <section className="financialOptions">
          <Label for="financialOptions" className="label-format">Financial Options</Label>
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
                  <Input type="checkbox" name="familyContributions" id="familyContributions" value="" />{' '}
                  Family Contributions
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" name="homeOwner" id="homeOwner" value="" />{' '}
                  Home Owner
                </Label>
              </FormGroup>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" name="ltcPolicy" id="ltcPolicy" value="" />{' '}
                  LTC Policy
                </Label>
              </FormGroup>
            </Col>
          </Row>
    </section>
  </>
  )
}
