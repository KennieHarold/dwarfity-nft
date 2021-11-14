import React from 'react';
import { Spinner } from 'react-bootstrap';

function FullScreenLoader() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        marginTop: '3em',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        background: 'white',
        zIndex: 999,
        opacity: 1,
        transition: 'opacity 0.5s'
      }}
    >
      <Spinner animation="grow" variant="primary" />
    </div>
  );
}

export default FullScreenLoader;
