import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label } from 'reactstrap'
import { TextArea } from './formik-inputs';

export const Note = ({ name, label, rows, cols, isReadOnly }) => {
  return (
    <FormGroup>
      <Label for={name} className="label-format">{label}</Label>
      <TextArea  name={name} cols={cols} rows={rows} disabled={isReadOnly} />
    </FormGroup>
  )
}

Note.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
  rows: PropTypes.number,
}

Note.defaultProps = {
  isReadOnly: false,
  rows: 3,
  cols: 10,
}