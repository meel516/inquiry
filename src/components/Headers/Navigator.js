import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
    </Navbar>
  );
}
