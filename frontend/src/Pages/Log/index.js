import React, { Component } from 'react';

import { getToken } from '../../services/auth';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import api from '../../services/api';

export default class Log extends Component {
  state = {
    token: '',
    carrinhos: [],
    itemCarrinho: '',
    itemCalibracao: '',
    calibracao: [],
    log: '',
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
    if (prevState.itemCarrinho !== this.state.itemCarrinho) {
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

    if (prevState.itemCalibracao !== this.state.itemCalibracao) {
      const log = await api.get(`/log/${this.state.itemCalibracao}`);
      this.setState({ log: log.data });
    }
  }

  render() {
    const {
      carrinhos,
      itemCarrinho,
      calibracao,
      itemCalibracao,
      log,
    } = this.state;
    const lista_carrinhos = [];
    carrinhos.forEach(carrinho => lista_carrinhos.push(carrinho.Carrinho));
    console.log(log);

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
          <div
            style={{
              backgroundColor: 'white',
              marginTop: 20,
              padding: 5,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                marginRight: 30,
              }}
            >
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
            </div>
            <div>
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
          </div>
        </div>
        <br />
        <div
          className="container"
          style={{
            backgroundColor: 'white',
            marginTop: 5,
            marginBottom: 30,
            borderRadius: 18,
            padding: 30,
          }}
        >
          {log ? (
            <>
              <p>Tempo : {log.tempo}</p>
              <p>Distancia Percorrida : {log.distancia_percorrida}</p>
              <p>Data : {log.Tentativa.data}</p>
              <p>Tempo : {log.tempo}</p>
              <br />
              <h6>Dados Log</h6>
              <br />
              {log.DadoLogs.map(dado => {
                return (
                  <>
                    <p>
                      {dado.TipoDadoLog.nome} : {dado.erro}
                    </p>
                    <p>Tempo : {dado.tempo}</p>
                  </>
                );
              })}
            </>
          ) : (
            <h4>Selecione um carrinho e um calibração</h4>
          )}
        </div>
      </>
    );
  }
}
