import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Input, FormGroup, Label } from 'reactstrap'
import { ErrorMessage } from 'formik';

export default function Note(props) {
  return (
    <FormGroup>
      <Label for={props.id} id={props.labelId} className="label-format">{props.label}</Label>
      <Input type="textarea" name={props.name || `lead.notes.${props.id}`} id={props.id} onChange={props.onChange} onBlur={props.onBlur} />
      <ErrorMessage name={props.name || `lead.notes.${props.id}`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg}</Alert>} />
    </FormGroup>
  )
}

Note.propTypes = {
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string,
}
