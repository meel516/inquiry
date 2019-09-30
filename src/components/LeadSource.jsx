import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap'
import { ErrorMessage } from 'formik';

import {getLeadSources, getLeadSourceDetails} from '../services/SalesServices'
import { FolderPlus } from 'react-feather';

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
    var leadSourceId = event.target.value;
    this.fetchAndSetLeadSourceDetail(leadSourceId);
    this.props.handleChange(event);
  }

  fetchAndSetLeadSourceDetail = (leadSourceId) => {
    console.log(leadSourceId);
    getLeadSourceDetails(leadSourceId)
      .then((data) => {
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
            <Input type="select" id="leadSource" name="lead.leadSource" onChange={this.handleOnChange} onBlur={this.props.handleBlur} >
              <option value="">Select One</option>
              {leadSourceOptions}
            </Input>
            <ErrorMessage name="lead.leadSource" component="div"/>
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
            <ErrorMessage name="lead.leadSourceDetail" component="div"/>
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
