import React from 'react';
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap';

const systemLinks = [
  {name: "SMS", location: "http://sales.uat.assisted.com"},
  {name: "Google", location: "http://www.google.com"},
]

export default class LinksManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    }
  }

  componentDidMount() {
    console.log('LinksManager componentDidMount()')
    console.log(process.env.REACT_APP_DOMAIN_DOMAIN)
    console.log(process.env.NODE_ENV_DOMAIN)
    this.setState({
      links: systemLinks
    })
  }

  render() {
    const {links} = this.state || [];
    const listItems = links.map((link) =>
      <SingleLink key={link.name} link={link} />
  );

    return (
      <Row>
        <Col>
          <ListGroup className="list-group-flush">
            <ListGroupItem className="list-group-bborder">
              <Col>
                <label>System Links</label>
              </Col>
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
      <a href={props.link.location}>{props.link.name}</a>
    </ListGroupItem>
  )
}
