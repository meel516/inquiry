import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap'

import {getLeadSources, getLeadSourceDetails} from '../services/SalesServices'

export default class LeadSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leadSource: [],
      leadSourceDetail: [],
    }
  }

  componentDidMount() {
    getLeadSources()
      .then((data) => this.setState({ leadSource: data }))
      .catch(error => console.log(error));

      if (this.props.leadSource) {
        const {leadSourceId} = this.props.leadSource;
        if (leadSourceId) {
          this.fetchAndSetLeadSourceDetail(leadSourceId);
        }
      }
  }

  handleOnChange = (event) => {
    debugger
    var leadSourceId = event.target.value;
    this.fetchAndSetLeadSourceDetail(leadSourceId);
    this.props.handleChange(event);
  }

  fetchAndSetLeadSourceDetail = (leadSourceId) => {
    console.log(leadSourceId);
    getLeadSourceDetails(leadSourceId)
      .then((data) => {
        var leadSourceDetail = data.map(function(lsd) {
          lsd.label = lsd.text
        });
        this.setState({leadSourceDetail: data})
      })
      .catch(error => console.log(error));
  }

  render() {
    const {leadSource, leadSourceDetail} = this.state||[];
    const {handleChange, handleBlur} = this.props;
    const leadSourceOptions = leadSource.map((type) => {
      return  <option key={type.value} value={type.value}>{type.text}</option>
    });
    const leadSourceDetailOptions = (leadSourceDetail||[]).map((type) => {
      return  <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <>
      <Row>
        <Col>
          <FormGroup>
            <Label for="leadSource" className="label-format">Lead Source</Label>
            <Input type="select" id="leadSource" name="lead.leadSource" onChange={this.handleOnChange}>
              <option value="">Select One</option>
              {leadSourceOptions}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="leadSourceDetail" className="label-format">Lead Source Detail</Label>
            <Input type="select" id="leadSourceDetail" name="lead.leadSourceDetail" onChange={handleChange}>
              <option value="">Select One</option>
              {leadSourceDetailOptions}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="additionalDetail"  className="label-format">Additional Detail</Label>
            <Input type="text" id="additionalDetail" name="lead.additionalDetail" placeholder="Additional Detail"  onChange={handleChange}  onBlur={handleBlur} />
          </FormGroup>
        </Col>
      </Row>
    </>  
    )
  }
}
