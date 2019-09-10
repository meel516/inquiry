import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';
import Select from 'react-select';
import CurrentSituation from './CurrentSituation';

const additionalCareElements = [
 { value: 1, label: 'Memory Concerns'},
 { value: 2, label: 'Mobility Concerns'},
 { value: 3, label: 'Nutrition Concerns'},
 { value: 4, label: 'Current Living Situation'},
];

export default class AdditionalCareElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      careElements: [],
    }
    this.handleSelectCareElements = this.handleSelectCareElements.bind(this);
  }

  componentDidMount() {
    console.log('AdditionalCareElements.componentDidMount()')
  }

  // elmnts - array of elements
  handleSelectCareElements(elmnts) {
    const elements = (elmnts || []).map((item) => {
      return item.value;
    })
    this.setState({
      careElements: elements,
    })
  }

  render() {
    const { careElements } = this.state || [];
    return (
      <>
      <Row>
        <Col md="9">
          <FormGroup>
            <Label for="additionalCareElements" className="label-format">Additional Care Elements Discovered</Label>
            <Select isMulti
              name="additionalCareElements"
              onChange={this.handleSelectCareElements}
              options={additionalCareElements}
              />
          </FormGroup>
        </Col>
      </Row>
      { (careElements.includes(1) === true) ? <MemoryConcerns /> : null }
      { (careElements.includes(2) === true) ? <MobilityConcerns /> : null }
      { (careElements.includes(3) === true) ? <NutritionConcerns/> : null }
      { (careElements.includes(4) === true) ? <CurrentSituation/> : null } 
      </>
    )  
  }
}

function NutritionConcerns(props) {
  return (
    <>
      <section className="nutritionalConcerns">
        <Label className="label-format">Nutrition Concerns</Label>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="diabetes" id="diabetes" value="" />{' '}
                Diabetes Diagnosis
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="lowsalt" id="lowsalt" value="" />{' '}
                Low Salt-Low Fat Diet Restrictions
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="prescribeddiet" id="prescribeddiet" value="" />{' '}
                Other Perscribed Diet Restrictions
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="noteatingwell" id="noteatingwell" value="" />{' '}
                Not Eating Consistently or Well
              </Label>
            </FormGroup>
          </Col>
        </Row>
  </section>
  </>
  )
}

function MobilityConcerns(props) {
  return (
    <>
      <section className="mobilityConcerns">
        <Label className="label-format">Mobility Concerns</Label>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="fallRisk" id="fallRisk" value="" />{' '}
                Fall Risk
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="regularlyWalks" id="regularlyWalks" value="" />{' '}
                Regularly Uses Walker
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="personTransfer" id="personTransfer" value="" />{' '}
                1 Person Transfer
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="usesWheelChair" id="usesWheelChair" value="" />{' '}
                Regularly Uses Wheelchair
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="secondPersonTransfer" id="secondPersonTransfer" value="" />{' '}
                2 Person Transfer
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="usesCane" id="usesCane" value="" />{' '}
                Regularly Uses Cane
              </Label>
            </FormGroup>
          </Col>
        </Row>
  </section>
  </>
  )
}

function MemoryConcerns(props) {
  return (
    <>
      <section className="memoryConcerns">
        <Label className="label-format">Memory Concerns</Label>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="dementia" id="dementia" value="" />{' '}
                Alzheimer's or Dementia Diagnosis
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="memoryloss" id="memoryloss" value="" />{' '}
                Argumentative Caused by Memory Loss
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="repeatsstories" id="repeatsstories" value="" />{' '}
                Regularly Forgets Things or Repeats Stories
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="wandering" id="wandering" value="" />{' '}
                Wandering
              </Label>
            </FormGroup>
          </Col>
        </Row>
  </section>
  </>
  )
}
