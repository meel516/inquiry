import React from 'react';
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap';

const systemLinks = [
  {name: "Google", location: "http://www.google.com"},
  {name: "Advisor Admin Form", location: "http://bkdcontactcenter.host/advisoradmin/"}, 
  {name: "CC Helpful Numbers", location: "http://teams.brookdaleliving.com/sites/sla/Quick%20Reference%20Guides/CC%20Helpful%20Numbers%202.12.19.docx"},
  {name: "SMS", location: "http://sales.uat.assisted.com"}, 
  {name: "Nurse on Call Locations", location: "http://www.nurseoncallfl.com/locations/"}, 
  {name: "Entry Fee & CCRC", location: "http://bkdcontactcenter.host/advisoradmin/"}, 
  {name: "Entry Fee Communities", location: "http://bkdcontactcenter.host/advisoradmin/"}, 
  {name: "Special Campaigns", location: "http://bkdcontactcenter.host/advisoradmin/"}, 
  {name: "Terminology", location: "http://bkdcontactcenter.host/advisoradmin/"}, 
  {name: "Community Profiles", location: "http://bkdcontactcenter.host/advisoradmin/"}, 
  {name: "CC Rate Finder", location: "http://bkdcontactcenter.host/advisoradmin/"},  
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
                <label className='label-format'>System Links</label>
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
