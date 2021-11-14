import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MainNavbar from './MainNavbar';
import { Container, Card } from 'react-bootstrap';
import { getUsersDwarves } from '../actions/CoreAction';
import FullScreenLoader from './FullScreenLoader';

function Profile(props) {
  useEffect(() => {
    props.getUsersDwarves();
  }, []);

  return (
    <>
      <MainNavbar />
      {props.userLoader ? (
        <FullScreenLoader />
      ) : (
        <Container className="mt-5">
          <h4 className="fw-bold">Your dwarves</h4>
          <div className="d-flex flex-row flex-wrap justify-content-center pb-5">
            {props.usersDwarves.map((dwarf) => (
              <Card
                className="m-2"
                key={`dwarf-${dwarf._id}`}
                style={{ width: '18rem', cursor: 'pointer' }}
              >
                <Card.Img variant="top" src={dwarf?.image} />
                <Card.Body>
                  <Card.Text
                    className="text-secondary fw-bold"
                    style={{ padding: 0, margin: 0 }}
                  >
                    {dwarf?.name}
                  </Card.Text>
                  <Card.Text className="fw-bold">#{dwarf?.token_id}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    usersDwarves: state.core.usersDwarves,
    userLoader: state.core.userLoader
  };
};

export default connect(mapStateToProps, { getUsersDwarves })(Profile);
