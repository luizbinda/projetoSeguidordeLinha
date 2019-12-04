import React, { Component } from 'react';

import { getToken } from '../../services/auth';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Lista from '../../components/Lista';

import api from '../../services/api';

export default class Log extends Component {
  state = {
    token: '',
    carrinhos: [],
    itemCarrinho: '',
    itemCalibracao: '',
    calibracao: [],
  };

  async componentDidMount() {
    const token = getToken();
    this.setState({ token: token });

    const [carrinhos] = await Promise.all([api.get(`/cars/${token.user.id}`)]);

    this.setState({
      carrinhos: carrinhos.data,
    });
  }

  async componentDidUpdate(_, prevState) {
    if (
      prevState.itemCarrinho !== this.state.itemCarrinho &&
      this.state.itemPista !== ''
    ) {
      const calibracao = await api.get(
        `/calibrations/${this.state.itemCarrinho}`
      );

      calibracao.data.forEach(DadoCalibracaoCarrinhos => {
        const dado = {
          id: DadoCalibracaoCarrinhos.id,
          nome: DadoCalibracaoCarrinhos.nome,
        };
        const dados = [dado, ...this.state.calibracao];
        this.setState({ calibracao: dados });
      });
    }
  }
  handleSubmit = async evt => {
    evt.preventDefault();
  };

  render() {
    const { carrinhos, itemCarrinho, calibracao, itemCalibracao } = this.state;
    const lista_carrinhos = [];
    carrinhos.forEach(carrinho => lista_carrinhos.push(carrinho.Carrinho));

    return (
      <>
        <div
          className="container"
          style={{
            backgroundColor: 'white',
            marginTop: 80,
            borderRadius: 18,
            padding: 30,
          }}
        >
          <h2>Logs</h2>
          <br />
          <InputLabel>Carrinho</InputLabel>
          <Select
            value={itemCarrinho}
            onChange={event => {
              this.setState({ itemCarrinho: event.target.value });
            }}
          >
            {lista_carrinhos.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.nome}
              </MenuItem>
            ))}
          </Select>
          <br />
          <br />
          <InputLabel>Calibração</InputLabel>
          <Select
            value={itemCalibracao}
            onChange={event => {
              this.setState({ itemCalibracao: event.target.value });
            }}
          >
            {calibracao.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.nome}
              </MenuItem>
            ))}
          </Select>
        </div>
        <br />
        <div
          className="container"
          style={{
            backgroundColor: 'white',
            marginTop: 5,
            borderRadius: 18,
            padding: 30,
          }}
        >
          <Lista />
        </div>
      </>
    );
  }
}
