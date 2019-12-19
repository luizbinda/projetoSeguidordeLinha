import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { logout } from './services/auth';

import Calibracao from './Pages/Calibracao';
import Log from './Pages/Log';
import Cadastro from './Pages/Cadastro';

export default class Routes extends React.Component {
  state = { value: 1, login: 0 };

  handleChange = (_, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { value, login } = this.state;

    return (
      <BrowserRouter>
        {login !== 1 ? (
          <AppBar
            style={{
              backgroundColor: '#7159c1',
            }}
          >
            <Tabs value={value} onChange={this.handleChange}>
              <Tab
                label="Deslogar"
                onClick={() => {
                  this.setState({ login: 0 });
                  logout();
                  window.location.href = process.env.REACT_APP_URL;
                }}
                component={Link}
                to="/"
              />
              <Tab label="Calibracao" component={Link} to="/" />
              <Tab label="Logs" component={Link} to="/logs" />
              <Tab label="Cadastro" component={Link} to="/cadastro" />
            </Tabs>
          </AppBar>
        ) : (
          <></>
        )}
        <Switch>
          <Route exact path="/" component={Calibracao} />
          <Route path="/logs" component={Log} />
          <Route path="/cadastro" component={Cadastro} />
        </Switch>
      </BrowserRouter>
    );
  }
}
