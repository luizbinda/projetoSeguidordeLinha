import Sequelize from 'sequelize';

import CalibracaoCarrinho from '../app/models/CalibracaoCarrinho';
import Carrinho from '../app/models/Carrinho';
import DadoCalibracaoCarrinho from '../app/models/DadoCalibracaoCarrinho';
import DadoLog from '../app/models/DadoLog';
import Log from '../app/models/Log';
import Pista from '../app/models/Pista';
import Setor from '../app/models/Setor';
import SetorCalibracaoCarrinho from '../app/models/SetorCalibracaoCarrinho';
import Tentativa from '../app/models/Tentativa';
import TipoDadoCalibracaoCarrinho from '../app/models/TipoDadoCalibracaoCarrinho';
import TipoDadoLog from '../app/models/TipoDadoLog';
import Usuario from '../app/models/Usuario';
import UsuarioCarrinho from '../app/models/UsuarioCarrinho';

import databaseConfig from '../config/database';

const models = [
  Usuario,
  Carrinho,
  UsuarioCarrinho,
  Pista,
  Setor,
  CalibracaoCarrinho,
  TipoDadoCalibracaoCarrinho,
  DadoCalibracaoCarrinho,
  TipoDadoLog,
  Tentativa,
  SetorCalibracaoCarrinho,
  Log,
  DadoLog,
];

class Database {
  constructor() {
    this.init();
    this.associateInit();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }

  associateInit() {
    models.forEach(model => {
      if (model.associate) model.associate(this.connection.models);
    });
  }
}

export default new Database();
