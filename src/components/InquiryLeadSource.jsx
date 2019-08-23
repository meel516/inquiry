import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';
import Select from 'react-select';

const URI_DROPDOWNS = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns`;

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
    fetch(URI_DROPDOWNS+'/inquiryLeadSource', {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
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
    console.log(`leadsourceId: ${leadSourceId}`);
    var url = `${URI_DROPDOWNS}/inquiryLeadSource/${leadSourceId}/inquiryLeadSourceDetails`;
    fetch(url, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
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
    const {leadSourceId} = this.props;

    return (
      <>
      <Row>
        <Col>
          <FormGroup>
            <Label for="leadSource">Lead Source</Label>
            <Select
              inputValue={leadSourceId}
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
