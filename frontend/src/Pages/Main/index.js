import React, { Component } from 'react';

import Container from '../../components/Container';
import { Form, SubmitButton } from './styles';

export default class Main extends Component {
  render() {
    return (
      <Container>
        <h1>Login</h1>
        <Form>
          <input type="text" placeholder="login" />
          <input type="text" placeholder="senha" />
          <SubmitButton>Logar</SubmitButton>
        </Form>
      </Container>
    );
  }
}
