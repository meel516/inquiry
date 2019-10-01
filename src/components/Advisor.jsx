import React from 'react';
import Select from 'react-select';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

const advisorList = [
  {
    label: "Alex Lane",
    value: 1,
  },
  {
    label: "Alicia Hallums",
    value: 2,
  },
  {
    label: "Amanda Brown",
    value: 3,
  },
  {
    label: "Amanda Rollins",
    value: 4,
  },
  {
    label: "Amber Clinkscales",
    value: 5,
  },
  {
    label: "Andrea Tate",
    value: 6,
  },
  {
    label: "Anitra Atkins",
    value: 7,
  }
]

export default class Advisor extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col>
            <Label>Advisor</Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Select options={advisorList} />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label htmlFor="advisorFirstName">Advisor First Name</Label>
              <Input type="text" id="advisorFirstName" name="advisorFirstName" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label htmlFor="advisorLastName">Advisor Last Name</Label>
              <Input type="text" id="advisorLastName" name="advisorLastName" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label htmlFor="">Advisor Email</Label>
              <Input type="text" id="advisorEmail" name="advisorEmail" />
            </FormGroup>
          </Col>
        </Row>
      </>
    )
  }
}
