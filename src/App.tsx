import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Route from './router';
import Layout from './layout';
import store from './redux';

const App = () => (
  <Layout>
    <Router>
      <Route />
    </Router>
  </Layout>
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
