import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LayoutManager from './pages/LayoutManager';

//location for Okta routing: https://developer.okta.com/code/react/okta_react/
function App() {
  return (
    <Router>
      <Route path="/" exact component={LayoutManager} />
    </Router>
  );
}

export default App;
