import React from 'react'
import PropTypes from 'prop-types'
import {Input, FormGroup, Label} from 'reactstrap'

export default function Note(props) {
  return (
    <FormGroup>
      <Label for={props.id} className="label-format">{props.label}</Label>
      <Input type="textarea" name={`lead.note.${props.id}`} id={props.id} onChange={props.onChange}/>
    </FormGroup>
  )
}

Note.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
}
