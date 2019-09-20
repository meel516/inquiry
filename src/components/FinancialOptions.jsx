import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

export default class Drivers extends React.Component {
  constructor(props) {
    super(props);
    // const {setFieldValue} = props;
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.financialOptions.".concat(name);
    const {setFieldValue} = this.props;
    setFieldValue(qualifiedName, checked);
  };
  
    render() {
      return (
        <>
        <section className="financialOptions">
            <Label for="financialOptions" className="label-format">Financial Options</Label>
            <Row>
              <Col>
                <FormGroup check inline className="col-4">
                  <Label check>
                    <Input type="checkbox" name="aidAttendance" onChange={this.handleInputChange} />{' '}
                    Aid & Attendance
                  </Label>
                </FormGroup>
                <FormGroup check inline className="col-4">
                  <Label check>
                    <Input type="checkbox" name="familyContributions" onChange={this.handleInputChange} />{' '}
                    Family Contributions
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup check inline className="col-4">
                  <Label check>
                    <Input type="checkbox" name="homeOwner" onChange={this.handleInputChange} />{' '}
                    Home Owner
                  </Label>
                </FormGroup>
                <FormGroup check inline className="col-4">
                  <Label check>
                    <Input type="checkbox" name="ltcPolicy" onChange={this.handleInputChange} />{' '}
                    LTC Policy
                  </Label>
                </FormGroup>
              </Col>
            </Row>
      </section>
    </>
    )
  }
}

