import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Pages/Main';
import AppNav from './components/AppNavigation';
import Calibracao from './Pages/Calibracao';
import Log from './Pages/Log';

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AppNav />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/calibracao" component={Calibracao} />
          <Route path="/logs" component={Log} />
        </Switch>
      </BrowserRouter>
    );
  }
}
