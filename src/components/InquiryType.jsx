import React from 'react';
import {Input, FormGroup, Label} from 'reactstrap';

const URL_INQUIRY_TYPES = "http://localhost/Sims/api/dropdowns/inquiryTypes";

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
                   item={type} />
  );
  return (
    <Input type="select" id="inquiryType" name="inquiryType">
      <option value=""></option>
      {inquiryTypeItems}
    </Input>
  )
}

function InquiryTypeItem(props) {
  return (
    <option value={props.item.value}>{props.item.text}</option>
  );
}
