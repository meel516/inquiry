import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Input, FormGroup, Label } from 'reactstrap'
import { ErrorMessage } from 'formik';

export default function Note(props) {
  return (
    <FormGroup>
      <Label for={props.id} id={props.labelId} className="label-format">{props.label}</Label>
      <Input 
        type="textarea"
        name={props.name || `lead.notes.${props.id}`} 
        value={props.value}
        id={props.id} 
        onChange={props.handleChange} 
        onBlur={props.handleBlur} 
        cols={props.cols}
        rows={props.rows}
        readOnly={props.isReadOnly}
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