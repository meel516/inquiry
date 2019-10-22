import React from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import PropTypes from 'prop-types'

import CurrentSituation from './CurrentSituation';

const additionalCareElements = [
  { value: 1, label: 'Memory Concerns' },
  { value: 2, label: 'Mobility Concerns' },
  { value: 3, label: 'Nutrition Concerns' },
  { value: 4, label: 'Current Living Situation' },
];

const additionalCareParams = [
  {
    params: {
      namespace: "lead.memoryConcerns.",
      fields: [
        "dementia", "memoryLoss", "repeatsStories", "wandering",
      ]
    }
  },
  {
    params: {
      namespace: "lead.mobilityConcerns.",
      fields: [
        "fallRisk", "regularlyWalks", "personTransfer", "usesWheelChair", "secondPersonTransfer", "usesCane",
      ]
    }
  },
  {
    params: {
      namespace: "lead.nutritionConcerns.",
      fields: [
        "diabetes", "lowSalt", "prescribedDiet", "notEatingWell",
      ]
    }
  },
];

export default class AdditionalCareElements extends React.Component {
  state = {
    hasMounted: false,
    careElements: [],
    defaultCareElements: [],
  }

  componentDidMount() {
    const { lead: { currentSituation } } = this.props;
    const { careElements, defaultCareElements } = this.state;

    if (currentSituation) {
      const situation = additionalCareElements[3]
      defaultCareElements.push(situation)
      careElements.push(situation.value)
    }

    this.setState({
      careElements,
      defaultCareElements
    })
  }

  differenceOf2Arrays = (array1, array2) => {
    var temp = [];
    array1 = array1.toString().split(',').map(Number);
    array2 = array2.toString().split(',').map(Number);

    for (var i in array1) {
      if (array2.indexOf(array1[i]) === -1) {
        temp.push(array1[i]);
      }
    }
    for (i in array2) {
      if (array1.indexOf(array2[i]) === -1) {
        temp.push(array2[i]);
      }
    }

    return temp.sort((a, b) => a - b);
  }

  handleCurrentSituationChange = ({ target: { name, value } }) => {
    const qualifiedName = `lead.${name}`;
    const { setFieldValue } = this.props;
    setFieldValue(qualifiedName, value);
  }

  // elmnts - array of elements
  handleSelectCareElements = (elmnts) => {
    const { setFieldValue } = this.props;
    const currentElements = this.state.careElements || [];
    const modifiedElements = elmnts || [];

    const elements = modifiedElements.map((item) => {
      return item.value;
    })

    this.setState({
      careElements: elements,
    })

    // set all checkboxes to false for care element if being removed
    const diff = modifiedElements.length - currentElements.length;
    if (diff < 0) {
      let removedElement = undefined;
      if (modifiedElements.length === 0) {
        removedElement = currentElements;
      } else {
        const justTheValues = modifiedElements.map((item) => { return item.value; });
        removedElement = this.differenceOf2Arrays(currentElements, justTheValues);
      }

      // we don't care about 4th care element, Current Living Situation
      if (removedElement < 4) {
        const params = additionalCareParams[removedElement[0] - 1].params;
        params.fields.forEach(e => {
          setFieldValue(params.namespace.concat(e), false);
        });
      } else {
        setFieldValue("lead.currentSituation", undefined);
      }
    }
  }

  handleMemoryConcernsInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.memoryConcerns.".concat(name);
    const { setFieldValue } = this.props;
    setFieldValue(qualifiedName, checked);
  };

  handleMobilityConcernsInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.mobilityConcerns.".concat(name);
    const { setFieldValue } = this.props;
    setFieldValue(qualifiedName, checked);
  };

  handleNutritionConcernsInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.nutritionConcerns.".concat(name);
    const { setFieldValue } = this.props;
    setFieldValue(qualifiedName, checked);
  };


  render() {
    const { careElements, defaultCareElements } = this.state || [];
    const { lead: { currentSituation } } = this.props;
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
                defaultValue={defaultCareElements}
              />
            </FormGroup>
          </Col>
        </Row>
        {(careElements.includes(1) === true) ? <MemoryConcerns handleChange={this.handleMemoryConcernsInputChange} isReadOnly={this.props.isReadOnly} /> : null}
        {(careElements.includes(2) === true) ? <MobilityConcerns handleChange={this.handleMobilityConcernsInputChange} isReadOnly={this.props.isReadOnly} /> : null}
        {(careElements.includes(3) === true) ? <NutritionConcerns handleChange={this.handleNutritionConcernsInputChange} isReadOnly={this.props.isReadOnly} /> : null}
        {(careElements.includes(4) === true) ? <CurrentSituation defaultValue={currentSituation} handleChange={this.handleCurrentSituationChange} isReadOnly={this.props.isReadOnly} /> : null}
      </>
    )
  }
}

AdditionalCareElements.propTypes = {
  lead: PropTypes.object.isRequired,

  isReadOnly: PropTypes.bool
}

AdditionalCareElements.defaultProps = {
  isReadOnly: false
}


function NutritionConcerns(props) {
  return (
    <>
      <section className="nutritionalConcerns">
        <Label className="label-format">Nutrition Concerns</Label>
        <Row>
          <Col>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="diabetes" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Diabetes Diagnosis
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="lowSalt" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Low Salt-Low Fat Diet Restrictions
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="prescribedDiet" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Other Prescribed Diet Restrictions
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="notEatingWell" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Not Eating Consistently or Well
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </section>
    </>
  )
}

NutritionConcerns.propTypes = {
  handleChange: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

NutritionConcerns.defaultProps = {
  isReadOnly: false
}

function MobilityConcerns(props) {
  return (
    <>
      <section className="mobilityConcerns">
        <Label className="label-format">Mobility Concerns</Label>
        <Row>
          <Col>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="fallRisk" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Fall Risk
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="regularlyWalks" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Regularly Uses Walker
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="personTransfer" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                1 Person Transfer
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="usesWheelChair" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Regularly Uses Wheelchair
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="secondPersonTransfer" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                2 Person Transfer
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="usesCane" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Regularly Uses Cane
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </section>
    </>
  )
}

MobilityConcerns.propTypes = {
  handleChange: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

MobilityConcerns.defaultProps = {
  isReadOnly: false
}

function MemoryConcerns(props) {
  return (
    <>
      <section className="memoryConcerns">
        <Label className="label-format">Memory Concerns</Label>
        <Row>
          <Col>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="dementia" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Alzheimer's or Dementia Diagnosis
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="memoryLoss" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Argumentative Caused by Memory Loss
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="repeatsStories" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Regularly Forgets Things or Repeats Stories
              </Label>
            </FormGroup>
            <FormGroup check inline className="col-4" disabled={props.isReadOnly}>
              <Label check>
                <Input type="checkbox" name="wandering" onChange={props.handleChange} disabled={props.isReadOnly} />{' '}
                Wandering
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </section>
    </>
  )
}

MemoryConcerns.propTypes = {
  handleChange: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

MemoryConcerns.defaultProps = {
  isReadOnly: false
}