import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import api from '../../services/api';
import { getToken } from '../../services/auth';

import { ContainerBootstrap, Form } from '../../components/Container';

export default class Cadastro extends Component {
  state = {
    token: '',
    openCarrinho: false,
    openPista: false,
    imgPista: '',
    imgPistaFile: '',
    openSetor: false,
    pistas: [],
    itemPista: '',
    openUser: false,
    openTipoDado: false,
  };

  async componentDidMount() {
    const token = getToken();
    const pistas = await api.get('/tracks');

    this.setState({ token: token, pistas: pistas.data });
  }

  handlerimgPista = e => {
    const file = e.target.files[0];
    this.setState({ imgPista: URL.createObjectURL(file), imgPistaFile: file });
  };

  handleCadastrarCarrinho = async () => {
    const {
      nomeCarrinho,
      tipo_motor,
      tipo_roda,
      quantidade_motores,
      quantidade_rodas,
      quantidade_sensores,
      comprimento,
      largura,
      token,
    } = this.state;

    await api
      .post('/cars', {
        nome: nomeCarrinho,
        tipo_motor,
        tipo_roda,
        quantidade_motores,
        quantidade_rodas,
        quantidade_sensores,
        comprimento,
        largura,
      })
      .catch(error => {
        alert(error.response.data.erro);
      });

    const config = {
      headers: { Authorization: `bearer ${token.token}` },
    };

    await api
      .post('/car_user', { nome: nomeCarrinho }, config)
      .then(() => {
        alert('Carrinho Cadastrado com Sucesso!');
        this.setState({ openCarrinho: false });
      })
      .catch(error => {
        console.log(error.response.data.erro);
      });
  };

  handleCadastrarPista = async () => {
    const {
      nomePista,
      quantidade_setores,
      valor_linha,
      imgPistaFile,
    } = this.state;

    if (nomePista && quantidade_setores && valor_linha) {
      const imgData = new FormData();

      imgData.append('file', imgPistaFile);

      const fileResponse = await api.post('/files', imgData).catch(error => {
        alert(error.response.data.erro);
      });

      await api
        .post('/tracks', {
          nome: nomePista,
          quantidade_setores,
          valor_linha,
          idFile: fileResponse.data.id,
        })
        .then(() => {
          alert('Pista Cadastrada');
          this.setState({ openPista: false });
        })
        .catch(error => {
          alert(error.response.data.erro);
        });
    } else {
      alert('Preencha todos os campos!!');
    }
  };

  handleCadastrarSetor = async () => {
    const { tamanho, itemPista } = this.state;

    if (tamanho && itemPista) {
      await api
        .post('/sectors', {
          pista: itemPista,
          tamanho,
        })
        .then(() => {
          alert('Setor Cadastrado');
          this.setState({ openSetor: false });
        })
        .catch(error => {
          alert(error.response.data.erro);
        });
    } else {
      alert('Preencha todos os campos!!');
    }
  };

  handleCadastrarUser = async () => {
    const { login, senha } = this.state;

    if (login && senha) {
      await api
        .post('/users', {
          login,
          senha,
        })
        .then(() => {
          alert('Usuario Cadastrado');
          this.setState({ openSetor: false });
        })
        .catch(error => {
          alert(error.response.data.erro);
        });
    } else {
      alert('Preencha todos os campos!!');
    }
  };

  handleCadastrarTipoDado = async () => {
    const { nome, descricao } = this.state;

    if (nome) {
      await api
        .post('/typecalibration', {
          nome,
          descricao,
        })
        .then(() => {
          alert('Tipo Dado Cadastrado');
          this.setState({ openTipoDado: false });
        })
        .catch(error => {
          alert(error.response.data.erro);
        });
    } else {
      alert('Preencha todos os campos!!');
    }
  };

  render() {
    const {
      openCarrinho,
      openPista,
      imgPista,
      openSetor,
      pistas,
      itemPista,
      openUser,
      openTipoDado,
    } = this.state;
    return (
      <>
        <ContainerBootstrap>
          <h1>Cadastros</h1>
          <Form>
            <Button
              style={{
                marginTop: 25,
                backgroundColor: '#7159c1',
                height: '50px',
              }}
              onClick={e => {
                e.preventDefault();
                this.setState({ openCarrinho: true });
              }}
            >
              Carrinho
            </Button>
            <Dialog
              open={openCarrinho}
              onClose={e => {
                e.preventDefault();
                this.setState({ openCarrinho: false });
              }}
            >
              <DialogTitle id="form-dialog-title">Carrinho</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Insira os dados para cadastra seu carrinho.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="nome"
                  label="Nome"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ nomeCarrinho: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="tipo_motor"
                  label="Tipo Motor"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ tipo_motor: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="tipo_roda"
                  label="Tipo Roda"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ tipo_roda: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="quantidade_motores"
                  label="Quantidade Motores"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ quantidade_motores: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="quantidade_rodas"
                  label="Quantidade Rodas"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ quantidade_rodas: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="quantidade_sensores"
                  label="Quantidade Sensores"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ quantidade_sensores: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="comprimento"
                  label="Comprimento"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ comprimento: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="largura"
                  label="Largura"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ largura: e.target.value });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ openCarrinho: false });
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={this.handleCadastrarCarrinho} color="primary">
                  Cadastrar
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              style={{
                marginTop: 25,
                backgroundColor: '#7159c1',
                height: '50px',
              }}
              onClick={e => {
                e.preventDefault();
                this.setState({ openPista: true });
              }}
            >
              Pista
            </Button>
            <Dialog
              open={openPista}
              onClose={e => {
                e.preventDefault();
                this.setState({ openPista: false });
              }}
            >
              <DialogTitle id="form-dialog-title">Pista</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Insira os dados para cadastra uma Pista.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="nome"
                  label="Nome"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ nomePista: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="quantidade_setores"
                  label="Quantidade Setores"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ quantidade_setores: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="valor_linha"
                  label="Valor da Linha"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ valor_linha: e.target.value });
                  }}
                />
                <label
                  id="imgPista"
                  style={{
                    cursor: 'pointer',
                    marginTop: 25,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  className={imgPista ? 'has-imgPista' : ''}
                >
                  <input
                    style={{
                      display: 'none',
                    }}
                    id="imgPista"
                    type="file"
                    onChange={this.handlerimgPista}
                  />
                  <img
                    style={{
                      minHeight: '350px',
                      width: '350px',
                      borderRadius: '5px',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      background: '#aaaa',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    id="imgPista"
                    src={imgPista}
                    alt="Selecione uma Imagem"
                  />
                </label>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ openPista: false });
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={this.handleCadastrarPista} color="primary">
                  Cadastrar
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              style={{
                marginTop: 25,
                backgroundColor: '#7159c1',
                height: '50px',
              }}
              onClick={e => {
                e.preventDefault();
                this.setState({ openSetor: true });
              }}
            >
              Setor
            </Button>
            <Dialog
              open={openSetor}
              onClose={e => {
                e.preventDefault();
                this.setState({ openSetor: false });
              }}
            >
              <DialogTitle id="form-dialog-title">Setor</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Insira os dados para cadastra um Setor.
                </DialogContentText>
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
                <TextField
                  margin="dense"
                  id="tamanho"
                  label="Tamanho"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ tamanho: e.target.value });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ openSetor: false });
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={this.handleCadastrarSetor} color="primary">
                  Cadastrar
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              style={{
                marginTop: 25,
                backgroundColor: '#7159c1',
                height: '50px',
              }}
              onClick={e => {
                e.preventDefault();
                this.setState({ openUser: true });
              }}
            >
              Usuario
            </Button>
            <Dialog
              open={openUser}
              onClose={e => {
                e.preventDefault();
                this.setState({ openUser: false });
              }}
            >
              <DialogTitle id="form-dialog-title">Setor</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Insira os dados para cadastra um Setor.
                </DialogContentText>
                <TextField
                  margin="dense"
                  id="Login"
                  label="login"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ login: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="senha"
                  label="Senha"
                  type="password"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ senha: e.target.value });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ openUser: false });
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={this.handleCadastrarUser} color="primary">
                  Cadastrar
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              style={{
                marginTop: 25,
                backgroundColor: '#7159c1',
                height: '50px',
              }}
              onClick={e => {
                e.preventDefault();
                this.setState({ openTipoDado: true });
              }}
            >
              Tipo Dado Calibração
            </Button>
            <Dialog
              open={openTipoDado}
              onClose={e => {
                e.preventDefault();
                this.setState({ openTipoDado: false });
              }}
            >
              <DialogTitle id="form-dialog-title">Setor</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Insira os dados para cadastra um Setor.
                </DialogContentText>
                <TextField
                  margin="dense"
                  id="nome"
                  label="Nome"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ nome: e.target.value });
                  }}
                />
                <TextField
                  margin="dense"
                  id="descricao"
                  label="Descrição"
                  fullWidth
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ descricao: e.target.value });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ openTipoDado: false });
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={this.handleCadastrarTipoDado} color="primary">
                  Cadastrar
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </ContainerBootstrap>
      </>
    );
  }
}
