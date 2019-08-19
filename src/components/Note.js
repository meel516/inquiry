import React from 'react';
import {Input, FormGroup, Label} from 'reactstrap';

export default function Note(props) {
  return (
    <FormGroup>
      <Label for={props.id}>{props.label}</Label>
      <Input type="textarea" name={props.name} id={props.id} />
    </FormGroup>
  )
}
