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
      <Contact type="prospect" contact={props.contact} onChange={props.onChange}/>
      <Row>
        <Col>
          <FormGroup>
            <Label for="dob" className="label-format">Birthdate</Label>
            <Input type="date" id="dob" name="lead.prospect.dob" value={props.contact.dob} onChange={props.onChange} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="age" className="label-format">Age</Label>
            <Input type="number" id="age" min='0' max='999' name="lead.prospect.age" value={props.contact.age} onChange={props.onChange} placeholder="Age" />
          </FormGroup>
        </Col>
      </Row>
    </>
  )
}
