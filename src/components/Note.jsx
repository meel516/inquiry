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
        id={props.id} 
        onChange={props.onChange} 
        onBlur={props.onBlur} 
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

  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
  rows: PropTypes.number,
}

Note.defaultProps = {
  isReadOnly: false,
  rows: 3,
  cols: 10,
}