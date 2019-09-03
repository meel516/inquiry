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
            <Label for="dob">Birthdate</Label>
            <Input type="date" id="dob" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="number" id="age" min='0' max='999' placeholder="Age" />
          </FormGroup>
        </Col>
      </Row>
    </>
  )
}
