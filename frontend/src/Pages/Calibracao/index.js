import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import api from '../../services/api';

export default class Calibracao extends Component {
  state = { carrinhos: [], pistas: [] };

  useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  async componentDidMount() {
    const [carrinhos, pistas] = await Promise.all([
      api.get('/cars/1'),
      api.get('/tracks'),
    ]);

    this.setState({ carrinhos: carrinhos.data, pistas: pistas.data });
  }

  render() {
    const { carrinhos, pistas, setores } = this.state;
    return (
      <>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Carrinho</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            {carrinhos.map(carrinho => (
              <MenuItem value={carrinho.Carrinho.id}>
                {carrinho.Carrinho.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Pista</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            {pistas.map(pista => (
              <MenuItem value={pista.id}>{pista.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Setor</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            {pistas.map(pista => (
              <MenuItem value={pista.id}>{pista.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }
}
