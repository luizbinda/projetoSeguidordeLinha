import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { logout } from './services/auth';

import Main from './Pages/Main';
import Calibracao from './Pages/Calibracao';
import Log from './Pages/Log';

export default class Routes extends React.Component {
  state = { value: 0, login: 1 };

  handleChange = (_, newValue) => {
    this.setState({ value: newValue });
  };

  componentDidUpdate(_, prevState) {
    //this.setState({ login: 1 });
    console.log(window.location.href);
  }

  render() {
    const { value, login } = this.state;

    return (
      <BrowserRouter>
        {login ? (
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
                }}
                component={Link}
                to="/"
              />
              <Tab label="Calibracao" component={Link} to="/calibracao" />
              <Tab label="Logs" component={Link} to="/logs" />
            </Tabs>
          </AppBar>
        ) : (
          <></>
        )}
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/calibracao" component={Calibracao} />
          <Route path="/logs" component={Log} />
        </Switch>
      </BrowserRouter>
    );
  }
}
