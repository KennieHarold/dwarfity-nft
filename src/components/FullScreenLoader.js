import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

function FullScreenLoader(props) {
  return props.initLoader ? (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
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
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    initLoader: state.blockchain.initLoader
  };
};

export default connect(mapStateToProps, null)(FullScreenLoader);
