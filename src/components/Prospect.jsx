import React from 'react';
import Contact from './Contact';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

export default function Prospect(props) {
  return (
    <>
      <Row>
        <Col>
          <Label><h4>Prospect</h4></Label>
        </Col>
      </Row>
      <Contact contact={props.contact} />
      <Row>
        <Col>
          <FormGroup>
            <Label for="dob">Date Of Birth</Label>
            <Input type="text" id="dob" placeholder="Date Of Birth" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="text" id="age" placeholder="Age" />
          </FormGroup>
        </Col>
      </Row>
    </>
  )
}
