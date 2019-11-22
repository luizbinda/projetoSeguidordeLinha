import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Pages/Main';
import Calibracao from './Pages/Calibracao';
import Pistas from './Pages/Pistas';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/calibracao" component={Calibracao} />
        <Route path="/pistas" component={Pistas} />
      </Switch>
    </BrowserRouter>
  );
}
