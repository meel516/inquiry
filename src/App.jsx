import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import ScrollingLayoutManager from './pages/ScrollingLayoutManager';
import SingePageLayoutManager from './pages/SingePageLayoutManager';

//location for Okta routing: https://developer.okta.com/code/react/okta_react/
function App() {
  return (
    <Router>
      <Route exact path="/" component={ScrollingLayoutManager} />
      <Route exact path="/inquiryForm" component={ScrollingLayoutManager} />
      <Route exact path="/inquiryFormSingle" component={SingePageLayoutManager} />
    </Router>
  );
}

export default App;
