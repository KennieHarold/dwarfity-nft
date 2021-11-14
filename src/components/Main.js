import React, { useEffect, useState } from 'react';
import MainNavbar from './MainNavbar';
import { connect } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';
import { loadProviderAndContract } from '../actions/BlockchainAction';
import {
  loadDwarvesForSale,
  purchaseDwarfFromSale
} from '../actions/CoreAction';
import FullScreenLoader from './FullScreenLoader';
import GlobalToast from './GlobalToast';

function Main(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function startup() {
      await props.loadProviderAndContract();
      await props.loadDwarvesForSale();

      setLoading(false);
    }

    startup();
  }, []);

  return (
    <>
      <GlobalToast />
      <MainNavbar />
      {loading || props.initLoader ? (
        <FullScreenLoader />
      ) : (
        <Container className="mt-5">
          <div className="d-flex flex-row flex-wrap justify-content-center pb-5">
            {props.dwarvesForSale.map((dwarf) => (
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
                  <Button
                    onClick={() => props.purchaseDwarfFromSale(dwarf)}
                    size="sm"
                  >
                    Buy {dwarf?.price?.value} ETH
                  </Button>
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
    initLoader: state.core.initLoader,
    dwarvesForSale: state.core.dwarvesForSale
  };
};

export default connect(mapStateToProps, {
  loadProviderAndContract,
  loadDwarvesForSale,
  purchaseDwarfFromSale
})(Main);
