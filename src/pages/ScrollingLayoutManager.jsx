import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Spinner } from 'reactstrap';
import { useOktaAuth } from '@okta/okta-react';
import { checkAuthentication } from '../auth/checkAuth';
import InquiryForm from './forms/InquiryMinForm';
import LinksManager from '../components/LinksManager';
import { Navigator } from './Headers/Navigator';
import Footer from './Footers/Footer';
import Section from '../components/Section';
import { SalesAPIService } from "../services/SalesServices";
import { ObjectMappingService } from "../services/Types";

const EMPTY_USER = {};

const LayoutManager = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [lead, setLead] = useState(null);
  const salesapi = new SalesAPIService();

  // Check authentication when authState or oktaAuth changes
  useEffect(() => {
    const authenticateUser = async () => {
      await checkAuthentication(setUserinfo, authState, oktaAuth);
    };
    authenticateUser();
  }, [authState, oktaAuth]);  // Only re-run when authState or oktaAuth changes

  // Fetch lead data based on URL query parameters
  useEffect(() => {
    const { search } = window.location;
    const { guid, umid, leadId, ils, ilsd, ilssd } = queryString.parse(search);

    const fetchLead = async () => {
      try {
        let leadData = {};
        if (guid || leadId) {
          leadData = await salesapi.getLeadById({ guid, leadId });
          if (leadData.prospect && !leadData.prospect.contactId) {
            leadData.prospectOnlyHasCC = await salesapi.prospectOnlyHasContactCenterCOI(leadData.influencer.contactId);
          } else {
            leadData.prospectOnlyHasCC = await salesapi.prospectOnlyHasContactCenterCOI(leadData.prospect.contactId);
          }
        } else {
          leadData = ObjectMappingService.createEmptyLead();
          leadData.prospectOnlyHasCC = false;
          if (ils) leadData.leadSource = ils;
          if (ilsd) leadData.leadSourceDetail = ilsd;
          if (ilssd) leadData.leadSourceSubDetail = parseInt(ilssd);
        }

        if (umid) leadData.umid = umid;
        setLead(leadData);
      } catch (error) {
        console.error('Error fetching lead:', error);
      }
    };

    fetchLead();
  }, []); // Empty dependency array means this runs only once when component mounts

  // Check authentication status and set `authenticated` state
  useEffect(() => {
    if (authState.isAuthenticated && userinfo && lead) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [authState, userinfo, lead]); // Re-run only when authState, userinfo, or lead change

  const formUser = userinfo ? {
    email: userinfo.email,
    name: userinfo.name,
    username: userinfo.preferred_username,
    zone: userinfo.zoneinfo,
    locale: userinfo.locale,
  } : EMPTY_USER;

  let mainContent;
  if (!authenticated || !userinfo || !lead) {
    mainContent = <Spinner type="border" size="sm" color="secondary">Loading Lead</Spinner>;
  } else {
    mainContent = <InquiryForm user={formUser} lead={lead} />;
  }

  return (
    <div>
      <Navigator authenticated={authenticated} name={userinfo ? userinfo.given_name : ''} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Section lead={lead} />
          </div>
          <div className="col-7 inquiry-form">
            {mainContent}
          </div>
          <div className="col-3">
            <LinksManager />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutManager;