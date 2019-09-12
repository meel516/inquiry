import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ScrollingLayoutManager from './pages/ScrollingLayoutManager';
import SingePageLayoutManager from './pages/SingePageLayoutManager';
import {Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';
import Home from './Home';

const OKTA_CLIENTID = `${process.env.OKTA_CLIENTID}`;

function App() {
  return (
    <Router>
      <Security issuer='https://brookdaledev.oktapreview.com/oauth2/default'
                client_id={OKTA_CLIENTID}
                redirect_uri={window.location.origin + '/implicit/callback'}>
        <Route path='/' exact component={Home} />
        <Route path='/implicit/callback' component={ImplicitCallback} />
        <SecureRoute exact path="/inquiryForm" component={ScrollingLayoutManager} />
        <SecureRoute exact path="/inquiryFormSingle" component={SingePageLayoutManager} />
      </Security>
    </Router>
  );
}

export default App;
