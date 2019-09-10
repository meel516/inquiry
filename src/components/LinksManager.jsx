import React from 'react';
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap';

const systemLinks = [
  {name: "Advisor Admin Form", location: "http://bkdcontactcenter.host/advisoradmin/"}, 
  {name: "CC Helpful Numbers", location: "http://teams.brookdaleliving.com/sites/sla/Quick%20Reference%20Guides/CC%20Helpful%20Numbers%202.12.19.docx"},
  {name: "SMS", location: "http://sales.uat.assisted.com"}, 
  {name: "Nurse on Call Locations", location: "http://www.nurseoncallfl.com/locations/"}, 
  {name: "Entry Fee & CCRC", location: "http://teams.brookdaleliving.com/sites/sla/Quick%20Reference%20Guides/CCRC%20%20EF.docx"}, 
  {name: "Entry Fee Communities", location: "http://teams.brookdaleliving.com/sites/sla/Quick%20Reference%20Guides/Entry%20Fee%20Communities.docx"}, 
  {name: "Special Campaigns", location: "http://bkdcontactcenter.host/advisoradmin/"}, 
  {name: "Terminology", location: "http://teams.brookdaleliving.com/sites/sla/Quick%20Reference%20Guides/Terminology.htm"}, 
  {name: "Community Profiles", location: "https://bkdcontactcenter.host/community-profile-look-up/"}, 
  {name: "CC Rate Finder", location: "http://edge.assisted.com/#/views/RateFinderUpdate/RateFinder?:iid=1"},
  {name: "Communities with Villas", location: "http://teams.brookdaleliving.com/sites/sla/Quick%20Reference%20Guides/Communities%20that%20Offer%20Villas.docx"},
  {name: "Free Meal Offer QRG", location: "http://teams.brookdaleliving.com/sites/sla/Special%20Campaigns%20%20Incentives/Free%20Meal%20Offer/Free%20Meal%20Offer%20QRG.docx"},
  {name: "Special Event RSVP Guide", location: "http://teams.brookdaleliving.com/sites/sla/Special%20Campaigns%20%20Incentives/July%20Veterans%20Events%202018/Special%20Event%20RSVP%20Guide.docx"},
  {name: "Aug Sept 2019 Promo QRG", location: "http://teams.brookdaleliving.com/sites/sla/Special%20Campaigns%20%20Incentives/2019%20Aug-Sept%20Free%20Month%20Promo/2019%20Aug-Sept%20Month%20Free%20Promo%20QRG.docx"},  
]

export default class LinksManager extends React.Component {
  state = {
    links: [],
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
