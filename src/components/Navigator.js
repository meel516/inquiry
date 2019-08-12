import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default function Navigator(props) {
  return (
    <Navbar color="light" light expand="md">
         <NavbarBrand href="/">Brookdale</NavbarBrand>
    </Navbar>
  );
}
