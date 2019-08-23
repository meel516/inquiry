import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { Search } from 'react-feather';

export default ResourceLookup extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {

  }

  render() {
    return (
      <InputGroup>
        <Input onChange={this.handleSearch} />
        <InputGroupAddon addonType="append">
          <Button color="primary"><Search /></Button>
        </InputGroupAddon>
      </InputGroup>
    )
  }
}
