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
      <Contact type="prospect" contact={props.contact} onChange={props.onChange} {...props}/>
      <Row>
        <Col xs="1" md="6">
          <FormGroup>
            <Label for="age" className="label-format">Age</Label>
            <Input type="number" id="age" name="lead.prospect.age" value={props.contact.age} onChange={props.onChange} placeholder="Age" />
          </FormGroup>
        </Col>
      </Row>
    </>
  )
}
