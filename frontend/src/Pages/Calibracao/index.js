import React, { Component } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import api from '../../services/api';

export default class Calibracao extends Component {
  state = {
    carrinhos: [],
    pistas: [],
    setores: [],
    itemPista: '',
    itemSetor: '',
    itemCarrinho: '',

    calibracao: [{ nome: '', valor: '' }],
  };

  async componentDidMount() {
    const [carrinhos, pistas] = await Promise.all([
      api.get('/cars/1'),
      api.get('/tracks'),
    ]);

    this.setState({
      carrinhos: carrinhos.data,
      pistas: pistas.data,
    });
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.itemPista !== this.state.itemPista) {
      const setores = await api.get(`/sectors/${this.state.itemPista}`);
      this.setState({ setores: setores.data });
    }
  }

  handleChangeCarrinho = event => {
    this.setState({ itemCarrinho: event.target.value });
  };

  handleChangePista = event => {
    this.setState({ itemPista: event.target.value, itemSetor: '' });
  };

  handleChangeSetor = event => {
    this.setState({ itemSetor: event.target.value });
  };

  handleCalibracaoNameChange = idx => evt => {
    const newcalibracao = this.state.calibracao.map((calibracao, sidx) => {
      if (idx !== sidx) return calibracao;
      return { ...calibracao, nome: evt.target.value };
    });

    this.setState({ calibracao: newcalibracao });
  };

  handleCalibracaoValorChange = idx => evt => {
    const newcalibracao = this.state.calibracao.map((calibracao, sidx) => {
      if (idx !== sidx) return calibracao;
      return { ...calibracao, valor: evt.target.value };
    });

    this.setState({ calibracao: newcalibracao });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    const dados = this.state.calibracao;

    console.log(dados);

    await api.post('/calibration', {
      nome: 'calibração179',
      carrinho: 'nelso',
      dados,
    });
  };

  handleAddCalibracao = () => {
    this.setState({
      calibracao: this.state.calibracao.concat([{ name: '', valor: '' }]),
    });
  };

  handleRemoveCalibracao = idx => () => {
    this.setState({
      calibracao: this.state.calibracao.filter((s, sidx) => idx !== sidx),
    });
  };

  render() {
    const {
      carrinhos,
      pistas,
      setores,
      itemPista,
      itemSetor,
      itemCarrinho,
    } = this.state;
    const lista_carrinhos = [];
    carrinhos.forEach(carrinho => lista_carrinhos.push(carrinho.Carrinho));

    return (
      <>
        <InputLabel>Carrinho</InputLabel>
        <Select value={itemCarrinho} onChange={this.handleChangeCarrinho}>
          {lista_carrinhos.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.nome}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Pista</InputLabel>
        <Select value={itemPista} onChange={this.handleChangePista}>
          {pistas.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.nome}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Setor</InputLabel>
        <Select value={itemSetor} onChange={this.handleChangeSetor}>
          {setores.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.id}
            </MenuItem>
          ))}
        </Select>
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={this.handleSubmit}>
          <h4>Calibracao</h4>
          <br />
          {this.state.calibracao.map((calibracao, idx) => (
            <div className="calibracao">
              <input
                type="text"
                placeholder={'Nome'}
                value={calibracao.nome}
                onChange={this.handleCalibracaoNameChange(idx)}
              />
              <input
                type="text"
                placeholder={'Valor'}
                value={calibracao.valor}
                onChange={this.handleCalibracaoValorChange(idx)}
              />
              <button
                type="button"
                onClick={this.handleRemoveCalibracao(idx)}
                className="small"
              >
                ------
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={this.handleAddCalibracao}
            className="small"
          >
            Novo campo
          </button>
          <button>Adicionar calibracao</button>
        </form>
      </>
    );
  }
}
