import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

export default function Navigator(props) { 
  const applicationName = `${process.env.REACT_APP_APPLICATION_NAME}`
  return (
    <Navbar color="light" light expand="md" className="noTopBottomPadding">
      <NavbarBrand href="/">
        <img
          src="/bsl_logo.jpg"
          width="253"
          height="60"
          className="d-inline-block align-top"
          alt="Brookdale Senior Living"
        />
      </NavbarBrand>
      <Nav md={5}>
        <NavItem>
          <h3>{applicationName}</h3>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" style={{paddingRight:"20px"}} navbar>
      { 
          props.authenticated !== null &&
          <NavItem>
            <p>Welcome, {props.userinfo.given_name}!</p>
          </NavItem>
        }
      </Nav>
    </Navbar>
  );
}

