import React from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { connectWallet } from '../actions/BlockchainAction';

function MainNavbar(props) {
  return (
    <Navbar
      className="py-3"
      expand="lg"
      style={{ borderBottom: '1px solid lightgray' }}
    >
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Dwarfity
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav>
            <Nav.Link href="/" className="text-dark">
              For sale
            </Nav.Link>
            <Nav.Link href="/" className="text-dark">
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {props.account !== '0x0' ? (
          <span>Connected to {props.account.substring(0, 7)}...</span>
        ) : (
          <Button
            disabled={props.walletLoader}
            onClick={props.connectWallet}
            className="ms-auto"
          >
            Connect Wallet
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    walletLoader: state.blockchain.walletLoader,
    account: state.blockchain.account
  };
};

export default connect(mapStateToProps, { connectWallet })(MainNavbar);
