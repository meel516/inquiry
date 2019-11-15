import React from 'react';
import { Col, Label, ListGroup, ListGroupItem, Row } from 'reactstrap';

export default function Section(props) {
  return (
    <Row>
      <Col>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="list-group-borderless">
            <Label className="label-format" >Section Links</Label>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#contactInfo">Contact Info</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#situation">Situation</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#passionPersonality">Passions & Personality</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#budget">Budget</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#resultOfCall">Result of Call</a>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  )
}
