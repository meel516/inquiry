import React from 'react';
import {Col, Input, FormGroup, Label, Row} from 'reactstrap';
import Contact from './Contact';
import Note from './Note';

export default class SecondPerson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containsSecondPerson: false,
    };

    this.handleSecondPerson = this.handleSecondPerson.bind(this);
  }

  handleSecondPerson(e) {
    console.log('handling checkbox');
    this.setState({
      containsSecondPerson: e.target.checked,
    })
  }

  renderQuestion() {
    return (
      <Row>
        <Col>
          <FormGroup check>
            <Label check className="label-format">
              <Input type="checkbox" onClick={(e) => this.handleSecondPerson(e)} />
              Is there a 2nd Prospect?
            </Label>
          </FormGroup>
        </Col>
      </Row>
    )
  }

  render() {
    const isSecondPersonShown = this.state.containsSecondPerson;
    if (isSecondPersonShown) {
      return (
        <>
        {this.renderQuestion()}
        <Contact contact={this.props.contact} />
        <Note label="2nd Person Situation" id="situation2" name="situation2"/>
        </>
      )
    } else {
      return this.renderQuestion()
    }
  }
}
