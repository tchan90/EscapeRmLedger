import React from 'react';
import {Navbar,Nav} from 'react-bootstrap'

 function Navigation() {
    return (
        <Navbar bg="dark" variant="dark">
    <Nav className="ml-auto">
      <Nav.Link href="/allCompanies">Escape Rooms</Nav.Link>
      <Nav.Link href="#register">Register</Nav.Link>
      <Nav.Link href="#login">Login</Nav.Link>
    </Nav>
  </Navbar>
    )
}
export default Navigation