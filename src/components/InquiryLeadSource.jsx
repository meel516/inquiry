import React from 'react'

import {Col, FormGroup, Input, Label, Row} from 'reactstrap'
import Select from 'react-select'

import {getLeadSources, getLeadSourceDetails} from '../services/SalesServices'

export default class InquiryLeadSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leadSourceList: [],
      leadSourceDetailList: [],
    }

    this.onChangeLeadSource = this.onChangeLeadSource.bind(this);
    this.fetchAndSetLeadSourceDetail = this.fetchAndSetLeadSourceDetail.bind(this);
  }

  componentDidMount() {
    getLeadSources()
      .then((data) => {
        var leadSource = data.map(function(ls) {
          ls.label = ls.text
        })
        this.setState({ leadSourceList: data })
      })
      .catch(error => console.log(error));

    if (this.props.leadSource) {
      const {leadSourceId} = this.props.leadSource;
      if (leadSourceId) {
        this.fetchAndSetLeadSourceDetail(leadSourceId);
      }
    }
  }

  onChangeLeadSource(event) {
    var leadSourceId = event.value;
    this.fetchAndSetLeadSourceDetail(leadSourceId);
  }

  fetchAndSetLeadSourceDetail(leadSourceId) {
    getLeadSourceDetails(leadSourceId)
      .then((data) => {
        var leadSourceDetailList = data.map(function(lsd) {
          lsd.label = lsd.text
        });
        this.setState({leadSourceDetailList: data})
      })
      .catch(error => console.log(error));
  }

  render() {
    const {leadSourceList, leadSourceDetailList} = this.state || [];
    const {leadSourceId, leadSourceDetailId} = this.props.leadSource;

    return (
      <>
      <Row>
        <Col>
          <FormGroup>
            <Label for="leadSource">Lead Source</Label>
            <Select
              defaultValue={leadSourceId}
              onChange={this.onChangeLeadSource}
              options={leadSourceList}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="leadSourceDetail">Lead Source Detail</Label>
            <Select
              defaultValue={leadSourceDetailId}
              onChange={this.onchangeLeadSourceDetail}
              options={leadSourceDetailList}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="additionalDetail">Additional Detail</Label>
            <Input type="text" id="additionalDetail" name="additionalDetail"/>
          </FormGroup>
        </Col>
      </Row>
    </>
    )
  }
}
