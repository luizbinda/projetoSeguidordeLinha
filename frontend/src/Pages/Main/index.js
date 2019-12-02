import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Container from '../../components/Container';
import { Form, SubmitButton } from './styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    token: {},
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

    const token = await api.post('/login', {
      login: this.state.login,
      senha: this.state.senha,
    });

    if (token.status === 200) {
      this.setState({ token: token.data, redirect: true });
    } else {
      console.log(token);
    }
  };

  render() {
    const { redirect, token } = this.state;
    if (redirect) {
      return (
        <Redirect to={{ pathname: '/calibracao', state: { token: token } }} />
      );
    } else {
      return (
        <Container>
          <h1>Login</h1>
          <Form>
            <input
              type="text"
              placeholder="login"
              onChange={this.handleChangeLogin}
            />
            <input
              type="password"
              placeholder="senha"
              onChange={this.handleChangeSenha}
            />

            <SubmitButton
              onClick={this.handleSubmit}
              style={{
                marginTop: 25,
              }}
            >
              Logar
            </SubmitButton>
          </Form>
        </Container>
      );
    }
  }
}
