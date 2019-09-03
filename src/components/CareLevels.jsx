import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';
import Select from 'react-select';

const extraCareLevelQuestions = {
}

const careLevels = [
  {value: 1, label: 'Nurture'},
  {value: 2, label: 'Alzheimer\'s/Dementia'},
  {value: 3, label: 'Assisted Living'},
  {value: 4, label: 'At Home'},
  {value: 5, label: 'BHS'},
  {value: 6, label: 'Hospice'},
  {value: 7, label: 'Independent Living'},
  {value: 8, label: 'Private Duty Home Care'},
  {value: 9, label: 'Rehab'},
  {value: 10, label: 'Skilled Nursing Care'},
  {value: 11, label: 'System Conversion'},
];

export default class CareLevels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      careLevels: careLevels,
      selectedCareLevel: null,
    }
    this.handleSelectCareLevel = this.handleSelectCareLevel.bind(this);
  }

  //
  handleSelectCareLevel(elmnt) {
    const {value} = elmnt || [];
    this.setState({
      selectedCareLevel: value,
    })
  }

  render() {
    const {careLevels} = this.state || [];
    return (
      <>
      <Row>
        <Col>
          <FormGroup>
            <Label for="careLevel" className="label-format">Care Level Recommended</Label>
            <Select
              onChange={this.handleSelectCareLevel}
              options={careLevels}
            />
          </FormGroup>
        </Col>
      </Row>
      { }
    </>
    )
  }
}

function Questions(props) {
  return (
    <>
    <Row>
      <Col>
        <Row>
          <Col>
            <FormGroup check>
              <Label for="recentvisit" className="label-format">
                <Input type="checkbox" id=""/>
                Have you/they had a recent visit to the ER?
              </Label>
            </FormGroup>
            <div class="form-check">
              <Input className="form-check-input" type="radio" name="visitedEr" id="recentVisit" value="Yes" checked />
              <Label className="form-check-label" for="exampleRadios1">Yes</Label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="visitedEr" id="recentVisit" value="No" checked />
              <label class="form-check-label" for="exampleRadios1">No</label>
            </div>
          </Col>
          <Col>
            <label for="recentfall" className="label-format">Have you/they had a recent fall?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="Yes" checked />
              <label class="form-check-label" for="exampleRadios1">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="No" checked />
              <label class="form-check-label" for="exampleRadios1">No</label>
            </div>
          </Col>
      </Row>
      <Row>
        <Col>
          <Label for="recentvisit" className="label-format">Have you/they had a recent surgery?</Label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="Yes" checked />
            <label class="form-check-label" for="exampleRadios1">Yes</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="No" checked />
            <label class="form-check-label" for="exampleRadios1">No</label>
          </div>
        </Col>
        <Col>
          <label for="recentfall" className="label-format">Have you/they had a recent or new illness?</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="Yes" checked />
            <label class="form-check-label" for="exampleRadios1">Yes</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="No" checked />
            <label class="form-check-label" for="exampleRadios1">No</label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <label for="recentvisit" className="label-format">Do you/they have any wounds?</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="Yes" checked />
            <label class="form-check-label" for="exampleRadios1">Yes</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="No" checked />
            <label class="form-check-label" for="exampleRadios1">No</label>
          </div>
        </Col>
        <Col>
          <label for="recentfall" className="label-format">Do they have any infections?</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
            <label class="form-check-label" for="exampleRadios1">Yes</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
            <label class="form-check-label" for="exampleRadios1">No</label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <label for="recentvisit" className="label-format">Are you/they experiencing shortness of breath or difficulty breathing?</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
            <label class="form-check-label" for="exampleRadios1">Yes</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
            <label class="form-check-label" for="exampleRadios1">No</label>
          </div>
        </Col>
        <Col>
          <label for="recentfall" className="label-format">Do you/they have difficulty leaving the home?</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
            <label class="form-check-label" for="exampleRadios1">Yes</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
            <label class="form-check-label" for="exampleRadios1">No</label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <label for="recentfall" className="label-format">Do you/they have difficulty performing household tasks such as laundry, shopping or light housekeeping?</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
            <label class="form-check-label" for="exampleRadios1">Yes</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
            <label class="form-check-label" for="exampleRadios1">No</label>
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
    </>
  )
}
