import React from 'react';
import { Alert, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { ErrorMessage } from 'formik';

import { DropDownService } from '../services/SalesServices'

export default class LeadSource extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leadSource: [],
      leadSourceDetail: [],
    }
  }

  componentDidMount() {
    DropDownService.getLeadSources()
      .then((data) => this.setState({ leadSource: data }))
      .catch(error => console.log(error));

    const { defaultLeadSource } = this.props;
    if (defaultLeadSource) {
      this.fetchAndSetLeadSourceDetail(defaultLeadSource);
    }
  }

  handleOnChange = (event) => {
    const { setFieldValue } = this.props;
    var leadSourceId = event.target.value;
    if (!leadSourceId) {
      this.setState({
        leadSourceDetail: [],
      })
      setFieldValue('lead.leadSourceDetail', '');
    } else {
      this.fetchAndSetLeadSourceDetail(leadSourceId);
    }
    this.props.handleChange(event);
  }

  fetchAndSetLeadSourceDetail = (leadSourceId) => {
    DropDownService.getLeadSourceDetails(leadSourceId)
      .then((data) => {
        this.setState({ leadSourceDetail: data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const { leadSource, leadSourceDetail } = this.state || [];
    const { handleChange, handleBlur, defaultLeadSource, defaultLeadSourceDetail } = this.props;

    const leadSourceOptions = leadSource.map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    const leadSourceDetailOptions = (leadSourceDetail || []).map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <>
        <Row>
          <Col>
            <FormGroup>
              <Label for="leadSource" className="label-format required-field">Lead Source</Label>
              <Input type="select" id="leadSource" name="lead.leadSource" value={defaultLeadSource} onChange={this.handleOnChange} onBlur={this.props.handleBlur} >
                <option value="">Select One</option>
                {leadSourceOptions}
              </Input>
              <ErrorMessage name="lead.leadSource" render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="leadSourceDetail" className="label-format required-field">Lead Source Detail</Label>
              <Input type="select" id="leadSourceDetail" name="lead.leadSourceDetail" value={defaultLeadSourceDetail} onChange={this.props.onChange}>
                <option value="">Select One</option>
                {leadSourceDetailOptions}
              </Input>
              <ErrorMessage name="lead.leadSourceDetail" render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="additionalDetail" className="label-format">Additional Detail</Label>
              <Input type="text" id="additionalDetail" name="lead.additionalDetail" placeholder="Additional Detail" onChange={handleChange} onBlur={handleBlur} />
              <ErrorMessage name="lead.additionalDetail" render={msg => <Alert color="danger" className="alert-smaller-size">{msg}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
      </>
    )
  }
}
