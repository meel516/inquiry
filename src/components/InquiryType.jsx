import React from 'react';
import PropTypes from 'prop-types';
import {Input, FormGroup, Label} from 'reactstrap';

const URL_INQUIRY_TYPES = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/inquiryTypes`;

const inquiryTypeList = [
 { value: 1, text: 'Call In'}
];

export default class InquiryType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inquiryTypes: [],
    }
  }

  componentDidMount() {
    fetch(URL_INQUIRY_TYPES, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
      .then((data) => this.setState({ inquiryTypes: data }))
      .catch(error => console.log(error));
  }


  render() {
    const {inquiryTypes} = this.state;

    return (
      <FormGroup>
        <Label for="inquiryType">Inquiry Type</Label>
        <InquiryTypes types={this.state.inquiryTypes} />
      </FormGroup>
    )
  }
}

function InquiryTypes(props) {
  const types = props.types;
  const inquiryTypeItems = types.map((type) =>
    <InquiryTypeItem key={type.value}
                   value={type.value}
                   label={type.label}/>
  );
  return (
    <Input type="select" id="inquiryType" name="inquiryType">
      <option value=""></option>
      {inquiryTypeItems}
    </Input>
  )
}

function InquiryTypeItem({value, label}) {
  return (
    <option key={value} value={value}>{label}</option>
  );
}

InquiryTypeItem.propTypes = {
   value: PropTypes.number.isRequired,
   label: PropTypes.string.isRequired
}
