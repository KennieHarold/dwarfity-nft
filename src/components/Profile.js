import React from 'react';
import MainNavbar from './MainNavbar';
import { Container } from 'react-bootstrap';

function Profile() {
  return (
    <>
      <MainNavbar />
      <Container className="mt-5">
        <h4 className="fw-bold">Your dwarves</h4>
        <div className="d-flex flex-row flex-wrap justify-content-center pb-5"></div>
      </Container>
    </>
  );
}

export default Profile;
