import React from 'react'
import PropTypes from 'prop-types'
import {Input, FormGroup, Label} from 'reactstrap'

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddNotes = this.handleAddNotes.bind(this);
  }

  handleAddNotes(e) {
    e.preventDefault();
    const val = e.target.value;
    const {id} = this.props;
    this.props.onChange(id, val);
  }

  render() {
    const {label, id} = this.props;
    return (
      <FormGroup>
        <Label for={id}>{label}</Label>
        <Input type="textarea" name={id} id={id} onChange={this.handleAddNotes}/>
      </FormGroup>
    )
  }
}

Note.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
}
