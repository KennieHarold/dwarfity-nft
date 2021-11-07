import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

function MainNavbar() {
  return (
    <Navbar className="py-3" expand="lg" style={{ borderBottom: '1px solid lightgray' }}>
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Dwarfity
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav>
            <Nav.Link href="/" className="text-dark">
              Dwarves for sale
            </Nav.Link>
            <Nav.Link href="/" className="text-dark">
              Your dwarves
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button className="ms-auto">Connect Wallet</Button>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
