import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

export default class ADLNeeds extends React.Component {

  render() {
    return (
      <div>
        <div><Label for="drivers">ADL Needs</Label></div>
        <div>
          <div className="d-inline-flex flex-md-fill p-1">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="bathing" name="bathing" value="" />{' '}
                Bathing
              </Label>
            </FormGroup>
          </div>
          <div className="d-inline-flex flex-md-fill p-1">
            <FormGroup check>
            <Label check>
              <Input type="checkbox" id="dressing" name="dressing" value="" />{' '}
              Dressing
            </Label>
          </FormGroup>
          </div>
          <div className="d-inline-flex flex-md-fill p-1">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="feeding" name="feeding" value="" />{' '}
                Feeding
              </Label>
            </FormGroup>
          </div>
        </div>
        <div>
          <div className="d-inline-flex flex-md-fill p-1">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="incontinence" name="incontinence" value="" />{' '}
                Incontinence
              </Label>
            </FormGroup>
          </div>
          <div className="d-inline-flex flex-md-fill p-1">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="location" name="location" value="" />{' '}
                Medications
              </Label>
            </FormGroup>
          </div>
          <div className="d-inline-flex flex-md-fill p-1">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="peaceOfMind" name="peaceOfMind" value="" />{' '}
                Toileting
              </Label>
            </FormGroup>
          </div>
        </div>
        <div>
          <div className="d-inline-flex flex-fill p-1">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="petFriendly" name="petFriendly" value="" />{' '}
                Transferring
              </Label>
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }
}
