import React from 'react'
import PropTypes from 'prop-types'
import {Input, FormGroup, Label} from 'reactstrap'

export default function Note({label, id, name = id}) {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input type="textarea" name={name} id={id} />
    </FormGroup>
  )
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
}
