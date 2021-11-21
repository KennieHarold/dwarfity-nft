import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

//  Components
import Main from './components/Main';
import Profile from './components/Profile';
import GlobalToast from './components/GlobalToast';
import ViewDwarf from './components/ViewDwarf';

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
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/view-dwarf/:tokenId" element={<ViewDwarf />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default app;
