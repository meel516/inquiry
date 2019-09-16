import React from 'react'
import PropTypes from 'prop-types'
import {Input, FormGroup, Label} from 'reactstrap'

export default function Note(props) {
  return (
    <FormGroup>
      <Label for={props.id} id={props.labelId} className="label-format">{props.label}</Label>
      <Input type="textarea" name={props.name||`lead.notes.${props.id}`} id={props.id} onChange={props.onChange} onBlur={props.onBlur}/>
    </FormGroup>
  )
}

Note.propTypes = {
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string,
}
