import React from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { Search } from 'react-feather';

/**
 * Handles resource lookups which was originally intended as a lookup
 * text box to perform searches.
 */
export default class ResourceLookup extends React.Component {

  handleSearch = () => {

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
