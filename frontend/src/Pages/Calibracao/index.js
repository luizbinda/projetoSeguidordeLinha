import React, { Component } from 'react';

import { FaPlus } from 'react-icons/all';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { SubmitButton } from './styles';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';

export default class Calibracao extends Component {
  state = {
    token: this.props.location.state.token,
    carrinhos: [],
    pistas: [],
    setores: [],
    itemPista: '',
    imgPista: '',
    itemSetor: '',
    itemCarrinho: '',
    nomeCalibracao: '',
    calibracao: [{ nome: '', valor: '' }],
    redirect: false,
  };

  async componentDidMount() {
    const { token } = this.state;
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
    const { itemCarrinho, nomeCalibracao } = this.state;

    if (!nomeCalibracao || !itemCarrinho || !dados) {
      alert('Preencha todos os campos');
    } else {
      try {
        await api.post('/calibration', {
          nome: nomeCalibracao,
          carrinho: itemCarrinho,
          dados,
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
      token,
      redirect,
    } = this.state;
    const lista_carrinhos = [];
    carrinhos.forEach(carrinho => lista_carrinhos.push(carrinho.Carrinho));

    if (redirect) {
      return <Redirect to={{ pathname: '/menu', state: { token: token } }} />;
    } else {
      return (
        <>
          <SubmitButton
            onClick={() => {
              this.setState({ redirect: true });
            }}
            style={{
              background: 'white',
              border: 0,
              padding: '15px 5px',
              marginLeft: '10px',
              borderRadius: ' 4px',

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              width: '100px',
            }}
          >
            Voltar
          </SubmitButton>
          <div
            className="container"
            style={{
              backgroundColor: 'white',
              marginTop: 25,
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
              <br />
              {this.state.calibracao.map((calibracao, idx) => (
                <div
                  key={idx}
                  className="calibracao"
                  style={{
                    borderRadius: 5,
                  }}
                >
                  <input
                    type="text"
                    placeholder={'Nome'}
                    value={calibracao.nome}
                    onChange={this.handleCalibracaoNameChange(idx)}
                    style={{
                      marginRight: 10,
                    }}
                  />
                  <input
                    type="text"
                    placeholder={'Valor'}
                    value={calibracao.valor}
                    onChange={this.handleCalibracaoValorChange(idx)}
                    style={{
                      marginRight: 10,
                    }}
                  />
                  <Button
                    type="button"
                    onClick={this.handleRemoveCalibracao(idx)}
                    className="small"
                    style={{
                      backgroundColor: '#7159c1',
                      marginBottom: 10,
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={this.handleAddCalibracao}
                className="small"
                style={{
                  backgroundColor: '#7159c1',
                  marginRight: 10,
                  marginBottom: 10,
                }}
              >
                Novo Campo
                <FaPlus
                  style={{
                    marginLeft: 10,
                  }}
                />
              </Button>
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
}
