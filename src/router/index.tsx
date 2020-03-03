import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../views/Login';
import Index from '../views/Index';
import NoMatch from '../views/NoMatch';
/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */
export default () => (
  <Switch>
    <Route exact path="/">
      <Login />
    </Route>
    <Route path="/index">
      <Index />
    </Route>
    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
);
