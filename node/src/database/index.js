import Sequelize from 'sequelize';

import CalibracaoCarrinho from '../app/models/CalibracaoCarrinho';
import Carrinho from '../app/models/Carrinho';
import DadosCalibracaoCarrinho from '../app/models/DadosCalibracaoCarrinho';
import Pista from '../app/models/Pista';
import Setor from '../app/models/Setor';
import TipoDadoCalibracaoCarrinho from '../app/models/TipoDadoCalibracaoCarrinho';
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
  DadosCalibracaoCarrinho,
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
