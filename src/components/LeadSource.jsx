import React from 'react';
import { Alert, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types'

import { getLeadSources, getLeadSourceDetails, getLeadSourceSubDetails } from '../services/dropdowns'

export default class LeadSource extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leadSource: [],
      leadSourceDetail: [],
      leadSourceSubDetail: [],
    }
  }

  componentDidMount() {
    getLeadSources()
      .then((data) => this.setState({ leadSource: data }))
      .catch(error => console.log(error));

    const { defaultLeadSource } = this.props;
    if (defaultLeadSource) {
      this.fetchAndSetLeadSourceDetail(defaultLeadSource);
    }
  }

  componentDidUpdate() {
    const {defaultLeadSource} = this.state;
    if (this.props.defaultLeadSource !== defaultLeadSource && this.props.defaultLeadSource !== -1) {
      this.fetchAndSetLeadSourceDetail(this.props.defaultLeadSource);
      this.setState({
        defaultLeadSource: this.props.defaultLeadSource
      })
    }
  }

  handleOnChange = (event) => {
    const { setFieldValue } = this.props;
    var leadSourceId = event.target.value;
    if (!leadSourceId) {
      this.setState({
        leadSourceDetail: [],
      })
      setFieldValue('lead.leadSourceDetail', -1);
    } else {
      this.fetchAndSetLeadSourceDetail(leadSourceId);
    }
    this.props.handleChange(event);
  }

  handleDetailOnChange = (event) => {
    const { setFieldValue } = this.props;
    var leadSourceDetailId = event.target.value;
    if (!leadSourceDetailId) {
      this.setState({
        leadSourceSubDetail: [],
      })
      setFieldValue('lead.leadSourceDetail', -1);
    } else {
      this.fetchAndSetLeadSourceDetail(leadSourceId);
    }
    this.props.handleChange(event);
  }

  fetchAndSetLeadSourceDetail = (leadSourceId) => {
    getLeadSourceDetails(leadSourceId)
      .then((data) => {
        this.setState({ leadSourceDetail: data })
      })
      .catch(error => console.log(error));
  }

  fetchAndSetLeadSourceSubDetail = (leadSourceDetailId) => {
    getLeadSourceSubDetails(leadSourceDetailId)
      .then((data) => {
        this.setState({ leadSourceSubDetail: data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const { leadSource, leadSourceDetail, leadSourceSubDetail } = this.state || [];

    const leadSourceOptions = leadSource.map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    const leadSourceDetailOptions = (leadSourceDetail || []).map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    const leadSourceSubDetailOptions = (leadSourceDetail || []).map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <>
        <Row>
          <Col>
            <FormGroup>
              <Label for="leadSource" className="label-format required-field">Lead Source</Label>
              <Input 
                type="select" 
                id="leadSource" 
                name="lead.leadSource" 
                value={this.props.defaultLeadSource} 
                onChange={this.handleOnChange} 
                onBlur={this.props.handleBlur}
                disabled={this.props.isReadOnly && this.props.isContactCenter}
              >
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
              <Input 
                type="select" 
                id="leadSourceDetail" 
                name="lead.leadSourceDetail" 
                value={this.props.defaultLeadSourceDetail} 
                onChange={this.props.handleChange}
                onBlur={this.props.handleBlur}
                disabled={this.props.isReadOnly && this.props.isContactCenter}
              >
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
              <Input 
                type="select" 
                id="leadSourceSubDetail" 
                name="lead.leadSourceSubDetail" 
                onChange={this.props.handleChange} 
                onBlur={this.props.handleBlur}
                readOnly={this.props.isReadOnly && this.props.isContactCenter}
                placeholder="Additional Detail" 
              />
              <ErrorMessage name="lead.leadSourceSubDetail" render={msg => <Alert color="danger" className="alert-smaller-size">{msg}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
      </>
    )
  }
}

LeadSource.propTypes = {
  defaultLeadSource: PropTypes.number,
  defaultLeadSourceDetail: PropTypes.number,
  defaultLeadSourceSubDetail: PropTypes.number,
  isContactCenter: PropTypes.bool,

  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

LeadSource.defaultProps = {
  defaultLeadSource: 0,
  defaultLeadSourceDetail: 0,
  isReadOnly: false,
  isContactCenter: false,
}