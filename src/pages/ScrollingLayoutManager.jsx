import React from 'react';
import { Spinner } from 'reactstrap';
import { withAuth } from '@okta/okta-react';
import queryString from 'query-string';
import { checkAuthentication } from '../auth/checkAuth';
import InquiryForm from './forms/InquiryMinForm';
import LinksManager from '../components/LinksManager';
import { Navigator } from './Headers/Navigator';
import Footer from './Footers/Footer';
import Section from '../components/Section';
import { SalesAPIService } from "../services/SalesServices";
import { ObjectMappingService } from "../services/Types";

const EMPTY_USER = {};

class LayoutManager extends React.Component {
  state = {
    authenticated: false,
    userinfo: null,
    lead: null,
  }
  checkAuthentication = checkAuthentication.bind(this);
  salesapi = new SalesAPIService();

  componentDidMount = async () => {
    const { location: { search }} = this.props;
    const { guid, umid, leadId } = queryString.parse(search);

    debugger;
    let lead = {};
    if (umid) {
      lead.umid = umid;
    } else if (guid || leadId) {
      lead = await this.salesapi.getLeadById({ guid, leadId });
    } else {
      lead = ObjectMappingService.createEmptyLead();
    }
    
    this.checkAuthentication();
    this.setState({ lead });
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    const { authenticated, userinfo, lead } = this.state;
    const formUser = userinfo ? ({
      email: userinfo.email,
      name: userinfo.name,
      username: userinfo.preferred_username,
      zone: userinfo.zoneinfo,
      locale: userinfo.locale,
    }) : EMPTY_USER;
    
    return (
      <div>
        <Navigator authenticated={authenticated} name={userinfo ? userinfo.given_name : ''} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <Section />
            </div>
            <div className="col-7 inquiry-form">
              {
                !authenticated || !userinfo || !lead ? (
                  <Spinner type="border" size="md" color="secondary">Loading Lead</Spinner>
                ) : (
                  <InquiryForm user={formUser} lead={lead} />
                )
              }
            </div>
            <div className="col-3">
              <LinksManager />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withAuth(LayoutManager);
