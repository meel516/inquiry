import React from 'react'
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

export default function Driver(props) {
  return (
    <>
    <section className="drivers">
        <Label for="drivers" className="section-header">Drivers</Label>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" id="activities" name="activities" value="" />{' '}
                Activities
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
            <Label check>
              <Input type="checkbox" id="accessToResidents" name="accessToResidents" value="" />{' '}
              Access to Residents
            </Label>
          </FormGroup>
          <FormGroup check inline className="col-3">
            <Label check>
              <Input type="checkbox" id="ageInPlace" name="ageInPlace" value="" />{' '}
              Age in Place
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup check inline className="col-4">
            <Label check>
              <Input type="checkbox" id="care" name="care" value="" />{' '}
              Care
            </Label>
          </FormGroup>
          <FormGroup check inline className="col-4">
            <Label check>
              <Input type="checkbox" id="location" name="location" value="" />{' '}
              Location
            </Label>
          </FormGroup>
          <FormGroup check inline className="col-3">
            <Label check>
              <Input type="checkbox" id="peaceOfMind" name="peaceOfMind" value="" />{' '}
              Peace of mind
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup check inline className="col-4">
            <Label check>
              <Input type="checkbox" id="petFriendly" name="petFriendly" value="" />{' '}
              Pet friendly
            </Label>
          </FormGroup>
          <FormGroup check inline className="col-4">
            <Label check>
              <Input type="checkbox" id="safety" name="safety" value="" />{' '}
              Safety
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </section>
  </>
  )
}
