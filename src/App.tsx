import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Route from './router';
import store from './redux';

const App = () => (
  <Router>
    <Route />
  </Router>
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
