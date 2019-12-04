import React, { Component } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import api from '../../services/api';
import { getToken } from '../../services/auth';

export default class Calibracao extends Component {
  state = {
    token: '',
    carrinhos: [],
    pistas: [],
    setores: [],
    itemPista: '',
    imgPista: '',
    itemSetor: '',
    itemCarrinho: '',
    nomeCalibracao: '',
    calibracao: [],
    redirect: false,
  };

  async componentDidMount() {
    const token = getToken();
    this.setState({ token: token });

    const [carrinhos, pistas] = await Promise.all([
      api.get(`/cars/${token.user.id}`),
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
      const { pistas } = this.state;
      pistas.forEach(pista => {
        if (this.state.itemPista === pista.id) {
          this.setState({ imgPista: pista.File.url });
        }
      });
    }

    if (
      (prevState.itemPista !== this.state.itemPista &&
        this.state.itemPista !== '') ||
      (prevState.itemCarrinho !== this.state.itemCarrinho &&
        this.state.itemPista !== '')
    ) {
      const calibracao = await api.get(
        `/calibration/${this.state.itemCarrinho}`
      );
      calibracao.data.DadoCalibracaoCarrinhos.forEach(
        DadoCalibracaoCarrinhos => {
          const dado = {
            nome: DadoCalibracaoCarrinhos.TipoDadoCalibracaoCarrinho.nome,
            valor: DadoCalibracaoCarrinhos.valor,
          };
          const dados = [dado, ...this.state.calibracao];
          this.setState({ calibracao: dados });
        }
      );

      this.setState({ nomeCalibracao: calibracao.data.nome });
    }
  }

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
    const { itemCarrinho, nomeCalibracao, itemSetor } = this.state;
    if (!nomeCalibracao || !itemCarrinho || !itemSetor || !dados) {
      alert('Preencha todos os campos');
    } else {
      try {
        await api.post('/calibration', {
          nome: nomeCalibracao,
          carrinho: itemCarrinho,
          dados,
          setor: itemSetor,
        });

        alert('calibracaoFeita');
      } catch (err) {
        alert('erro');
      }
    }

    this.setState({
      nomeCalibracao: '',
      calibracao: [{ nome: '', valor: '' }],
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
      nomeCalibracao,
      imgPista,
    } = this.state;
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
          <InputLabel>Pista</InputLabel>
          <Select
            value={itemPista}
            onChange={event => {
              this.setState({ itemPista: event.target.value });
            }}
          >
            {pistas.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.nome}
              </MenuItem>
            ))}
          </Select>
          <div>
            <img src={imgPista} alt="" style={{ maxWidth: '150px' }} />
          </div>
          <InputLabel>Setor</InputLabel>
          <Select
            value={itemSetor}
            onChange={event => {
              this.setState({ itemSetor: event.target.value });
            }}
          >
            {setores.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            ))}
          </Select>
          <br />
          <br />
          <form>
            <h2>Calibracao</h2>
            <input
              type="text"
              placeholder={'Nome da calibração'}
              value={nomeCalibracao}
              onChange={event => {
                this.setState({ nomeCalibracao: event.target.value });
              }}
              style={{
                marginBottom: 10,
              }}
            />
            {this.state.calibracao.map((calibracao, idx) => (
              <div
                key={idx}
                className="calibracao"
                style={{
                  borderRadius: 5,
                }}
              >
                <p>
                  {calibracao.nome} {' : '}
                  <input
                    type="text"
                    placeholder={'Valor'}
                    value={calibracao.valor}
                    onChange={this.handleCalibracaoValorChange(idx)}
                    style={{
                      marginRight: 10,
                    }}
                  />
                </p>
              </div>
            ))}
            <Button
              onClick={this.handleSubmit}
              style={{
                backgroundColor: '#7159c1',
                marginBottom: 10,
              }}
            >
              Adicionar calibracao
            </Button>
          </form>
        </div>
      </>
    );
  }
}
