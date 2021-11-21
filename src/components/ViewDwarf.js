import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Container, Spinner } from 'react-bootstrap';
import { CoreServiceInstance } from '../services';

function ViewDwarf() {
  const [dwarf, setDwarf] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    async function init() {
      setLoading(true);

      const path = location.pathname.split('/');
      const tokenId = path[path.length - 1];
      const dbDwarf = await CoreServiceInstance.getDwarfityByTokenId(tokenId);

      if (dbDwarf && dbDwarf !== undefined) {
        setDwarf(dbDwarf);
      }

      setLoading(false);
    }
    init();
  }, []);
  return (
    <Container className="mt-5">
      <div className="d-flex align-items-center justify-content-center">
        {loading ? (
          <Spinner animation="grow" variant="primary" />
        ) : dwarf ? (
          <Card style={{ width: '18rem', cursor: 'pointer' }}>
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
        ) : (
          <h4>Not Found!</h4>
        )}
      </div>
    </Container>
  );
}

export default ViewDwarf;
