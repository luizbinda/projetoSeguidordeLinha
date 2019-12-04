import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Container from '../../components/Container';
import { Form, SubmitButton } from './styles';
import api from '../../services/api';

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
    } catch (err) {
      console.log(err);
      alert('Usuario ou Senha Invalido!');
    }
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: '/calibracao' }} />;
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
