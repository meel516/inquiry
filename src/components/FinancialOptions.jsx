import React from 'react';
import {Container, Col, FormGroup, Input, Label, Row} from 'reactstrap';

export default function FinancialOptions(props) {
  return (
    <Container>
      <div><Label for="fincialOptions">Financial Options</Label></div>
      <Row>
        <Col md="6">
          <FormGroup check inline>
            <Label check>
              <Input type="checkbox" name="aidAttendance" id="aidAttendance" value="" />{' '}
              Aid & Attendance
            </Label>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup check inline>
            <Label check>
              <Input type="checkbox" name="familyContribuations" id="familyContribuations" value="" />{' '}
              Family Contributions
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup check inline>
            <Label check>
              <Input type="checkbox" name="homeOwner" id="homeOwner" value="" />{' '}
              Home Owner
            </Label>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup check inline>
            <Label check>
              <Input type="checkbox" name="ltcPolicy" id="ltcPolicy" value="" />{' '}
              LTC Policy
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </Container>
  )
}
