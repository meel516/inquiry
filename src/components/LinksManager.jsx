import React from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import systemLinks from '../constants/system-links'


export default class LinksManager extends React.Component {
  state = {
    links: [],
  }

  componentDidMount() {
    this.setState({
      links: systemLinks
    })
  }

  render() {
    const { links } = this.state || [];
    const listItems = links.map((link) =>
      <SingleLink key={link.name} link={link} />
    );

    return (
      <Row>
        <Col>
          <ListGroup className="list-group-flush">
            <ListGroupItem className="list-group-bborder">
              <label className='label-format'>System Links</label>
            </ListGroupItem>
            {listItems}
          </ListGroup>
        </Col>
      </Row>
    )
  }
}

function SingleLink(props) {
  return (
    <ListGroupItem className="list-group-borderless list-group-nopadding">
      <a target='newwin' href={props.link.location}>{props.link.name}</a>
    </ListGroupItem>
  )
}
