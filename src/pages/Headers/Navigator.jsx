import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { checkAuthentication } from '../../Helpers';

export default function Navigator(props) {
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
        {false && <NavItem>
          <h3>{props.userinfo.name}</h3>
        </NavItem>}
      </Nav>
    </Navbar>
  );
}
