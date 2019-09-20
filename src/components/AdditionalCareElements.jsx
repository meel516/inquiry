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
    this.handleMemoryConcernsInputChange = this.handleMemoryConcernsInputChange.bind(this);
    this.handleMobilityConcernsInputChange = this.handleMobilityConcernsInputChange.bind(this);
    this.handleNutritionConcernsInputChange = this.handleNutritionConcernsInputChange.bind(this);
  }

  handleCurrentSituationChange = ({ target: { name, value } }) => {
    const qualifiedName = `lead.${name}`;
    const {setFieldValue} = this.props;
    setFieldValue(qualifiedName, value);
  }

  // elmnts - array of elements
  handleSelectCareElements = (elmnts) => {
    const elements = (elmnts || []).map((item) => {
      return item.value;
    })
    this.setState({
      careElements: elements,
    })
  }

  handleMemoryConcernsInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.memoryConcerns.".concat(name);
    const {setFieldValue} = this.props;
    setFieldValue(qualifiedName, checked);
  };
  
  handleMobilityConcernsInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.mobilityConcerns.".concat(name);
    const {setFieldValue} = this.props;
    setFieldValue(qualifiedName, checked);
  };

  handleNutritionConcernsInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.nutritionConcerns.".concat(name);
    const {setFieldValue} = this.props;
    setFieldValue(qualifiedName, checked);
  };
  

  render() {
    const { careElements } = this.state || [];
    return (
      <>
      <Row>
        <Col>
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
      { (careElements.includes(1) === true) ? <MemoryConcerns onChange={this.handleMemoryConcernsInputChange}/> : null }
      { (careElements.includes(2) === true) ? <MobilityConcerns onChange={this.handleMobilityConcernsInputChange}/> : null }
      { (careElements.includes(3) === true) ? <NutritionConcerns onChange={this.handleNutritionConcernsInputChange}/> : null }
      { (careElements.includes(4) === true) ? <CurrentSituation onChange={this.handleCurrentSituationChange}/> : null } 
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
                <Input type="checkbox" name="diabetes" onChange={props.onChange} />{' '}
                Diabetes Diagnosis
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="lowSalt" onChange={props.onChange} />{' '}
                Low Salt-Low Fat Diet Restrictions
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="prescribedDiet" onChange={props.onChange} />{' '}
                Other Perscribed Diet Restrictions
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="notEatingWell" onChange={props.onChange} />{' '}
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
                <Input type="checkbox" name="fallRisk" onChange={props.onChange} />{' '}
                Fall Risk
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="regularlyWalks" onChange={props.onChange} />{' '}
                Regularly Uses Walker
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="personTransfer" onChange={props.onChange} />{' '}
                1 Person Transfer
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="usesWheelChair" onChange={props.onChange} />{' '}
                Regularly Uses Wheelchair
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="secondPersonTransfer" onChange={props.onChange} />{' '}
                2 Person Transfer
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="usesCane" onChange={props.onChange} />{' '}
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
                <Input type="checkbox" name="dementia" onChange={props.onChange} />{' '}
                Alzheimer's or Dementia Diagnosis
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="memoryLoss" onChange={props.onChange} />{' '}
                Argumentative Caused by Memory Loss
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="repeatsStories" onChange={props.onChange} />{' '}
                Regularly Forgets Things or Repeats Stories
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4">
              <Label check>
                <Input type="checkbox" name="wandering" onChange={props.onChange} />{' '}
                Wandering
              </Label>
            </FormGroup>
          </Col>
        </Row>
  </section>
  </>
  )
}
