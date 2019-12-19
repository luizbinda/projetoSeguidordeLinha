import React, { Component } from 'react';

import { ContainerBootstrap } from '../../components/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Form } from './styles';
import api from '../../services/api';
import Routes from '../../routes';

import { login, setLogado } from '../../services/auth';

export default class Main extends Component {
  state = {
    login: '',
    senha: '',
    redirect: false,
  };

  handleChangeLogin = async e => {
    this.setState({ login: e.target.value });
  };

  handleChangeSenha = async e => {
    this.setState({ senha: e.target.value });
  };

  handleSubmit = async evt => {
    evt.preventDefault();

    try {
      const token = await api.post('/login', {
        login: this.state.login,
        senha: this.state.senha,
      });
      if (token.status === 200) {
        login(token.data);
        setLogado(1);
        this.setState({ redirect: true });
      }
    } catch (e) {
      alert(e.response.data.erro);
    }
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Routes />;
    } else {
      return (
        <ContainerBootstrap>
          <h1>Login</h1>
          <br />
          <Form>
            <TextField
              onChange={e => {
                this.setState({ login: e.target.value });
              }}
              style={{
                width: '100%',
              }}
              variant="outlined"
              margin="dense"
              id="login"
              label="Login"
              value={this.state.login}
              fullWidth
            />
            <TextField
              onChange={e => {
                this.setState({ senha: e.target.value });
              }}
              style={{
                width: '100%',
              }}
              type="password"
              variant="outlined"
              margin="dense"
              id="senha"
              label="Senha"
              value={this.state.senha}
              fullWidth
            />

            <Button
              onClick={this.handleSubmit}
              style={{
                marginTop: 25,
                backgroundColor: '#7159c1',
                width: '100%',
                height: '50px',
              }}
            >
              Logar
            </Button>
          </Form>
        </ContainerBootstrap>
      );
    }
  }
}
