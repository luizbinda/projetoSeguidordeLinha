import React, { Component } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
      prevState.itemPista !== this.state.itemPista ||
      (prevState.itemCarrinho !== this.state.itemCarrinho &&
        this.state.itemPista !== '') ||
      (prevState.itemSetor !== this.state.itemSetor &&
        this.state.itemSetor !== '')
    ) {
      const calibracao = await api.get(
        `/calibration/${this.state.itemCarrinho}`
      );

      if (calibracao.data.calibracao) {
        calibracao.data.calibracao.DadoCalibracaoCarrinhos.forEach(
          DadoCalibracaoCarrinhos => {
            const dado = {
              idTipoDadocalibracao:
                DadoCalibracaoCarrinhos.fk_TipoDadoCalibracaoCarrinho_id,
              valor: DadoCalibracaoCarrinhos.valor,
            };
            const dados = [dado, ...this.state.calibracao];
            this.setState({ calibracao: dados });
          }
        );
      }

      const tipoCalibracao = calibracao.data.tipoCalibracao;

      const tipoCalibracaoDados = tipoCalibracao.map(tipoCalibracao => {
        const dado = {
          id: tipoCalibracao.id,
          nome: tipoCalibracao.nome,
          valor: 0,
        };

        return dado;
      });

      tipoCalibracaoDados.forEach((TipoCalibracao, index) => {
        this.state.calibracao.forEach(Calibracao => {
          if (TipoCalibracao.id === Calibracao.idTipoDadocalibracao) {
            tipoCalibracaoDados[index] = {
              id: tipoCalibracaoDados[index].id,
              nome: tipoCalibracaoDados[index].nome,
              valor: Calibracao.valor,
            };
          }
        });
      });

      if (calibracao.data.calibracao) {
        this.setState({
          nomeCalibracao: calibracao.data.calibracao.nome,
          calibracao: tipoCalibracaoDados,
        });
      } else {
        this.setState({ calibracao: tipoCalibracaoDados });
      }
    }
  }

  handleCalibracaoValorChange = idx => evt => {
    const newcalibracao = this.state.calibracao.map((calibracao, sidx) => {
      if (idx !== sidx) return calibracao;
      return { ...calibracao, valor: evt.target.value };
    });

    this.setState({ calibracao: newcalibracao });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    const dados = this.state.calibracao.filter(
      calibracao => calibracao.valor > 0
    );

    const { itemCarrinho, nomeCalibracao, itemSetor } = this.state;
    if (!nomeCalibracao || !itemCarrinho || !itemSetor || !dados) {
      alert('Preencha todos os campos');
    } else {
      const expData = /(([0-2]{1}[0-9]{1}|3[0-1]{1})\/(0[0-9]{1}|1[0-2]{1})\/[0-9]{4})/g;
      const expHora = /([0|1|2]\d):([0|1|2|3|4|5]\d):([0|1|2|3|4|5]\d)$/g;

      const datas = nomeCalibracao.match(expData);
      const horas = nomeCalibracao.match(expHora);

      let nome = nomeCalibracao;

      if (datas && horas) {
        nome = nomeCalibracao
          .replace(datas[0], new Date().toLocaleDateString())
          .replace(horas[0], new Date().toLocaleTimeString());
      } else {
        nome =
          nome +
          ' ' +
          new Date().toLocaleDateString() +
          ' ' +
          new Date().toLocaleTimeString();
      }

      await api
        .post('/calibration', {
          nome: nome,
          carrinho: itemCarrinho,
          dados,
          setor: itemSetor,
        })
        .then(() => {
          alert('Calibração Feita');
        })
        .catch(error => {
          alert(error.response.data.erro);
        });
    }

    this.setState({
      nomeCalibracao: '',
      calibracao: [],
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
      calibracao,
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
            <TextField
              style={{
                width: '100%',
              }}
              variant="outlined"
              margin="dense"
              id="nome"
              label="Nome da calibração"
              value={nomeCalibracao}
              fullWidth
              onChange={e => {
                e.preventDefault();
                const nome = e.target.value;
                this.setState({ nomeCalibracao: nome });
              }}
            />
            <br />
            {calibracao.map((tipoCalibracao, idx) => (
              <div
                key={idx}
                className="calibracao"
                style={{
                  borderRadius: 5,
                }}
              >
                <TextField
                  style={{
                    width: '20%',
                  }}
                  variant="outlined"
                  margin="dense"
                  id={tipoCalibracao.nome}
                  label={tipoCalibracao.nome}
                  value={tipoCalibracao.valor}
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.handleCalibracaoValorChange(idx);
                  }}
                />
              </div>
            ))}
            <Button
              onClick={this.handleSubmit}
              style={{
                marginBottom: 10,
                marginTop: 10,
                backgroundColor: '#7159c1',
                height: '50px',
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
