import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

//  Components
import Main from './components/Main';
import FullScreenLoader from './components/FullScreenLoader';

function bindMiddleware(middleware) {
  if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

function app() {
  const store = createStore(rootReducer, bindMiddleware([reduxThunk]));

  return (
    <Provider store={store}>
      <FullScreenLoader />
      <Main />
    </Provider>
  );
}

export default app;
