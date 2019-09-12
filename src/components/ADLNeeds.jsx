import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

export default function ADLNeeds(props) {
    return (
      <>
      <section className="adlNeeds">
        <Label for="adlNeeds" className="label-format">ADL Needs</Label>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="bathing" id="bathing" value="" />{' '}
                Bathing
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="dressing" id="dressing" value="" />{' '}
                Dressing
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-3">
              <Label check>
                <Input type="checkbox" name="feeding" id="feeding" value="" />{' '}
                Feeding
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="incontinence" id="incontinence" value="" />{' '}
                Incontinence
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="medications" id="medications" value="" />{' '}
                Medications
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-3">
              <Label check>
                <Input type="checkbox" name="toileting" id="toileting" value="" />{' '}
                Toileting
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="transferring" id="transferring" value="" />{' '}
                Transferring
              </Label>
            </FormGroup>
          </Col>
        </Row>
    </section>
  </>
  )
}
