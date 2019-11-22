import React, { Component } from 'react';

import Container from '../../components/Container';
import api from '../../services/api';

import { List, SubmitButton } from './styles';

export default class Carrinhos extends Component {
  state = {
    carrinhos: [],
  };

  async componentDidMount() {
    const response = await api.get('/cars/1');

    this.setState({ carrinhos: response.data });
  }

  render() {
    const { carrinhos } = this.state;

    return (
      <Container>
        <List>
          {carrinhos.map(carrinho => (
            <li key={carrinho.Carrinho.id}>
              <span>{carrinho.Carrinho.nome}</span>
              <SubmitButton>calibrar</SubmitButton>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
