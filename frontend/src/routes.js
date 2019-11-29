import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Pages/Main';
import Calibracao from './Pages/Calibracao';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/calibracao" component={Calibracao} />
      </Switch>
    </BrowserRouter>
  );
}
