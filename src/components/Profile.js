import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MainNavbar from './MainNavbar';
import { Container, Card, Tabs, Tab, Figure, Button } from 'react-bootstrap';
import { getUsersDwarves } from '../actions/CoreAction';
import FullScreenLoader from './FullScreenLoader';
import placeholder from '../assets/placeholder.jpg';

function Profile(props) {
  const [selectParentX, setSelectParentX] = useState(undefined);
  const [selectParentY, setSelectParentY] = useState(undefined);

  useEffect(() => {
    props.getUsersDwarves();
  }, []);

  const handleSelect = (id) => {
    if (selectParentX === id) {
      setSelectParentX(undefined);
    } else {
      if (selectParentX === undefined && selectParentY === undefined) {
        setSelectParentX(id);
      } else {
        if (selectParentY === id) {
          setSelectParentY(undefined);
        } else if (selectParentX !== undefined && selectParentY === undefined) {
          setSelectParentY(id);
        } else {
          //  Pass
        }
      }
    }
  };

  const handleBreed = () => {};

  const renderImage = (id) => {
    const index = props.usersDwarves.findIndex((dwarf) => dwarf._id === id);

    if (index !== -1) {
      return props.usersDwarves[index].image;
    }

    return placeholder;
  };

  return (
    <>
      <MainNavbar />
      {props.userLoader ? (
        <FullScreenLoader />
      ) : (
        <Container className="mt-5">
          <Tabs defaultActiveKey="profile" className="mb-3">
            <Tab eventKey="profile" title="Profile">
              <>
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
                        <Card.Text className="fw-bold">
                          #{dwarf?.token_id}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </>
            </Tab>
            <Tab eventKey="breed" title="Breed">
              <h4 className="fw-bold">Breed</h4>
              <div className="d-flex flex-column align-items-center">
                <div className="mt-5  d-flex flex-column">
                  <div className="d-flex flex-row align-items-center">
                    <Figure className="m-2">
                      <Figure.Image
                        width={175}
                        height={190}
                        src={renderImage(selectParentX)}
                      />
                      <Figure.Caption className="text-center">
                        Parent X
                      </Figure.Caption>
                    </Figure>
                    <span style={{ fontSize: 75, margin: 25 }}>+</span>
                    <Figure className="m-2">
                      <Figure.Image
                        width={175}
                        height={190}
                        src={renderImage(selectParentY)}
                      />
                      <Figure.Caption className="text-center">
                        Parent Y
                      </Figure.Caption>
                    </Figure>
                  </div>
                  <Button className="mt-3">Breed Now!</Button>
                </div>
                <div className="mt-5">
                  <h6 className="fw-bold text-center">
                    Choose 2 dwarves to breed
                  </h6>
                  <div className="mt-3 pb-5 d-flex flex-row flex-wrap">
                    {props.usersDwarves.map((dwarf) => (
                      <Card
                        onClick={() => handleSelect(dwarf._id)}
                        className="m-2"
                        key={`dwarf-to-breed-${dwarf._id}`}
                        style={{
                          width: '8rem',
                          cursor: 'pointer',
                          border:
                            selectParentX === dwarf._id ||
                            selectParentY === dwarf._id
                              ? '2px solid #0d6efd'
                              : null
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={dwarf?.image}
                          height="100"
                          width="100"
                        />
                        <Card.Body>
                          <Card.Text
                            className="text-secondary fw-bold"
                            style={{ padding: 0, margin: 0, fontSize: 14 }}
                          >
                            {dwarf?.name}
                          </Card.Text>
                          <Card.Text
                            className="fw-bold"
                            style={{ fontSize: 12 }}
                          >
                            #{dwarf?.token_id}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
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
