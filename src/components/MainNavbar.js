import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { connectWallet } from '../actions/BlockchainAction';

function MainNavbar(props) {
  let navigate = useNavigate();
  let location = useLocation();

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
          <Nav className="ms-3">
            <Nav.Link
              onClick={() => navigate('/')}
              style={{ color: location.pathname === '/' ? 'blue' : 'black' }}
            >
              For sale
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate('/profile')}
              style={{
                color: location.pathname === '/profile' ? 'blue' : 'black'
              }}
            >
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
