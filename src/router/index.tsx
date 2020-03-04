import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '@/layout';

import Login from '@/views/Login';
import Index from '@/views/Index';
import NoMatch from '@/views/NoMatch';
/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */
export default () => (
  <Switch>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route path="/404">
      <NoMatch />
    </Route>
    <Layout>
      <Route path="/index">
        <Index />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Layout>
  </Switch>
);
