import React from 'react';

import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { logout } from '../../services/auth';

export default class AppNav extends React.Component {
  state = { value: 1, login: 1 };

  handleChange = (_, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    const { value, login } = this.state;

    if (!login) {
      return <> </>;
    } else {
      return (
        <AppBar>
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
      );
    }
  }
}
