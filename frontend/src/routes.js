import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Pages/Main';
import Menu from './Pages/Menu';
import Calibracao from './Pages/Calibracao';
import Log from './Pages/Log';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/menu" component={Menu} />
        <Route path="/calibracao" component={Calibracao} />
        <Route path="/logs" component={Log} />
      </Switch>
    </BrowserRouter>
  );
}
