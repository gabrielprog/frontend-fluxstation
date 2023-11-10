import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/';
import Fuel from './pages/FuelHistory';
import Register from './pages/Register';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/fuel" component={Fuel} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default AppRouter;