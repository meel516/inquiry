import React from 'react';
import { Col, Label, ListGroup, ListGroupItem, Row } from 'reactstrap';

export default function Section(props) {
  return (
    <Row>
      <Col>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="list-group-borderless">
            <Label>Section Links</Label>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#contactinfo">Contact Info</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#situation">Situation</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#budget">Budget Passions & Personality</a>
          </ListGroupItem>
          <ListGroupItem className="list-group-borderless">
            <a href="#nextsteps">Next Steps</a>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  )
}
