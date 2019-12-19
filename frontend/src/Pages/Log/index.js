import React, { Component } from 'react';

import { getToken } from '../../services/auth';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { ContainerBootstrap, Container, Container2, P } from './styles';
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

    return (
      <>
        <ContainerBootstrap>
          <h2>Logs</h2>
          <Container>
            <div>
              <InputLabel>Carrinho</InputLabel>
              <Select
                style={{ minWidth: 150 }}
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

              <InputLabel style={{ marginTop: '20px' }}>Calibração</InputLabel>
              <Select
                style={{ minWidth: 150 }}
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
          </Container>
        </ContainerBootstrap>
        <br />
        <Container2>
          {log ? (
            <>
              <TextField
                style={{
                  width: '50%',
                }}
                margin="dense"
                variant="outlined"
                id="distancia"
                label="Distancia Percorrida"
                value={log.distancia_percorrida}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <br />
              <TextField
                style={{
                  width: '50%',
                }}
                margin="dense"
                variant="outlined"
                id="Data"
                label="Data"
                value={log.Tentativa.data}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <br />
              <TextField
                style={{
                  width: '50%',
                }}
                margin="dense"
                variant="outlined"
                id="Tempo"
                label="Tempo"
                value={new Date(log.tempo).toLocaleTimeString()}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <br />
              <br />
              <P>Dados Log</P>
              {log.DadoLogs.map(dado => {
                return (
                  <div key={dado.TipoDadoLog.nome}>
                    <TextField
                      style={{
                        width: '30%',
                        marginRight: 30,
                      }}
                      margin="dense"
                      variant="outlined"
                      id={dado.TipoDadoLog.nome}
                      label={dado.TipoDadoLog.nome}
                      value={dado.erro}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                    <TextField
                      style={{
                        width: '30%',
                      }}
                      margin="dense"
                      variant="outlined"
                      id={'Tempo' + dado.TipoDadoLog.nome}
                      label="Tempo"
                      value={dado.tempo}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <P>Selecione um carrinho e um calibração</P>
          )}
        </Container2>
      </>
    );
  }
}
