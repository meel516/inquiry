import React from 'react';
import { withAuth } from '@okta/okta-react';

import { checkAuthentication } from '../auth/checkAuth';
import InquiryForm from '../components/InquiryMinForm';
import LinksManager from '../components/LinksManager';
import Navigator from './Headers/Navigator';
import Footer from './Footers/Footer';
import Section from '../components/Section';

export default withAuth(class LayoutManager extends React.Component { 
  state = {
    authenticated: null, 
    userinfo: null,
  }
  checkAuthentication = checkAuthentication.bind(this)

  componentDidMount() {
    this.checkAuthentication();
  }

  componentDidUpdate() {
     this.checkAuthentication();
  }

  render () {
   const props = {...this.props, ...this.state};
   return (
     <div>
       <Navigator {...props}/>
       <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Section />
          </div>
          <div className="col-7 inquiry-form">
            <InquiryForm {...props} />
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
})
