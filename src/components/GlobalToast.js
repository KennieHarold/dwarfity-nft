import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import { CoreTypes } from '../actions/types';

function GlobalToast(props) {
  const dispatch = useDispatch();

  return (
    <Toast
      show={props.show}
      onClose={dispatch({
        type: CoreTypes.SHOW_TOAST,
        payload: { status: false }
      })}
      style={{ position: 'absolute', right: 20, zIndex: 999, top: 20 }}
    >
      <Toast.Header>
        <img className="rounded me-2" alt="" />
        <strong className="me-auto">{props?.title}</strong>
      </Toast.Header>
      <Toast.Body>{props?.text}</Toast.Body>
    </Toast>
  );
}

const mapStateToProps = (state) => {
  return {
    show: state.core.showToast.status,
    title: state.core.showToast.title,
    text: state.core.showToast.text
  };
};

export default connect(mapStateToProps, {})(GlobalToast);
