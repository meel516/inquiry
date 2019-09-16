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
            <a href="#contactinfo">Contact Info</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#situation">Situation</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#passionsPersonality">Passions & Personality</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#financialSituation">Budget</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#nextStepsLabel">Result of Call</a>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  )
}
