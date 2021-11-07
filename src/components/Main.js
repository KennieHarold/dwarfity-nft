import React from 'react';
import MainNavbar from './MainNavbar';
import { Container, Card } from 'react-bootstrap';

function Main() {
  return (
    <>
      <MainNavbar />
      <Container className="mt-5">
        <Card style={{ width: '18rem', cursor: 'pointer' }}>
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/drojzt0c0/image/upload/v1636297104/dwarfity/nfts/genesis_jwxzpg.png"
          />
          <Card.Body>
            <Card.Title className="fw-bold">Dwarfity #0</Card.Title>
            <Card.Text style={{ fontSize: 14 }}>
              This is the mother of all dwarves. We called it the genesis dwarf
            </Card.Text>
            <Card.Text className="fw-bold" style={{ fontSize: 14, color: 'green' }}>
              Buy for 0.005 ETH
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Main;
