import React, { Component } from 'react';

import Container from '../../components/Container';
import Setor from '../../components/Setor';
import api from '../../services/api';

import { List, SubmitButton } from './styles';

export default class Carrinhos extends Component {
  state = {
    pistas: [],
    setores: [],
  };

  async componentDidMount() {
    const response = await api.get('/tracks');

    this.setState({ pistas: response.data });
  }

  handleSubmit = async e => {
    e.preventDefault();
    return <Setor />;
  };

  render() {
    const { pistas } = this.state;

    return (
      <Container>
        <List>
          {pistas.map(pista => (
            <li key={pista.id}>
              <span>{pista.nome}</span>
              <SubmitButton onClick={this.handleSubmit}>calibrar</SubmitButton>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
