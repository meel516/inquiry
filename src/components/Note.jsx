import React from 'react'
import PropTypes from 'prop-types'
import { Alert, FormGroup, Label } from 'reactstrap'
import { ErrorMessage } from 'formik';
import { TextArea } from './formik-inputs';

export default function Note(props) {
  return (
    <FormGroup>
      <Label for={props.id} id={props.labelId} className="label-format">{props.label}</Label>
      <TextArea 
        name={props.name || `lead.notes.${props.id}`} 
        cols={props.cols}
        rows={props.rows}
      />
      <ErrorMessage name={props.name || `lead.notes.${props.id}`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg}</Alert>} />
    </FormGroup>
  )
}

Note.propTypes = {
  id: PropTypes.string,
  labelId: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.string,
}

Note.defaultProps = {
  isReadOnly: false,
  rows: 3,
  cols: 10,
}