import React from 'react';
import { Col, Label, ListGroup, ListGroupItem, Row } from 'reactstrap';

export default function Section(props) {
  return (
    <Row>
      <Col>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <Label>Section Links</Label>
          </ListGroupItem>
          <ListGroupItem>
            <a href="#contactinfo">Contact Info</a>
          </ListGroupItem>
          <ListGroupItem>
            <a href="#situation">Situation</a>
          </ListGroupItem>
          <ListGroupItem>
            <a href="#budget">Budget Passions & Personality</a>
          </ListGroupItem>
          <ListGroupItem>
            <a href="#nextsteps">Next Steps</a>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  )
}
