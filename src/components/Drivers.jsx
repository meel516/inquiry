import React from 'react'
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

export default class Drivers extends React.Component {
  constructor(props) {
    super(props);
    const {setFieldValue} = props;
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.drivers.".concat(name);
    const {setFieldValue} = this.props;
    setFieldValue(qualifiedName, checked);
  };

  
  render() {
    return (
      <>
      <section className="drivers">
          <Label for="drivers"  className="label-format">Drivers</Label>
          <Row>
            <Col>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" name="activities" onChange={this.handleInputChange} />{' '}
                  Activities
                </Label>
              </FormGroup>
              <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="accessToResidents" onChange={this.handleInputChange} />{' '}
                Access to Residents
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-3">
              <Label check>
                <Input type="checkbox" name="ageInPlace" onChange={this.handleInputChange} />{' '}
                Age in Place
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="care" onChange={this.handleInputChange} />{' '}
                Care
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="location" onChange={this.handleInputChange} />{' '}
                Location
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-3">
              <Label check>
                <Input type="checkbox" name="peaceOfMind" onChange={this.handleInputChange} />{' '}
                Peace of mind
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="petFriendly" onChange={this.handleInputChange} />{' '}
                Pet friendly
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="safety" onChange={this.handleInputChange} />{' '}
                Safety
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </section>
    </>
    )
  }
}