import React, { Component } from 'react';

import Container from '../../components/Container';
import { Form, SubmitButton } from './styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    token: [{ id: '', token: '' }],
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    const { token } = this.state;

    await api.post('/calibration', {
      nome: nomeCalibracao,
      carrinho: itemCarrinho,
      dados,
    });

    alert('calibracaoFeita');
    this.setState({
      nomeCalibracao: '',
      calibracao: [{ nome: '', valor: '' }],
    });
  };

  render() {
    return (
      <Container>
        <h1>Login</h1>
        <Form>
          <input type="text" placeholder="login" />
          <input type="text" placeholder="senha" />
          <SubmitButton onClick={this.handleSubmit}>Logar</SubmitButton>
        </Form>
      </Container>
    );
  }
}
