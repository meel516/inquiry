import React from 'react';
import Contact from './Contact';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

export default function Prospect(props) {
  return (
    <>
      <Row>
        <Col>
          <Label className="section-header" >Prospect</Label>
        </Col>
      </Row>
      <Contact contact={props.contact} />
      <Row>
        <Col>
          <FormGroup>
            <Label for="dob" className="label-format">Birthdate</Label>
            <Input type="date" id="dob" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="age" className="label-format">Age</Label>
            <Input type="number" id="age" min='0' max='999' placeholder="Age" />
          </FormGroup>
        </Col>
      </Row>
    </>
  )
}
