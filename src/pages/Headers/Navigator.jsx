import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { checkAuthentication } from '../../Helpers';

export default withAuth(class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img
            src="/bsl_logo.jpg"
            width="253"
            height="60"
            className="d-inline-block align-top"
            alt="Brookdale Senior Living"
          />
        </NavbarBrand>
        <Nav>
          <NavItem>
            <h3>Inquiry Form</h3>
          </NavItem>
          {
            this.state.authenticated !== null &&
            <NavItem>
              <p>Welcome, {this.state.userinfo.given_name}!</p>
            </NavItem>
          }
        </Nav>
      </Navbar>
    );
  }
});
