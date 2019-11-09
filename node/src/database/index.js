import Sequelize from 'sequelize';

import Usuario from '../app/models/Usuario';
import Carrinho from '../app/models/Carrinho';
import UsuarioCarrinho from '../app/models/UsuarioCarrinho';
import Pista from '../app/models/Pista';
import Setor from '../app/models/Setor';

import databaseConfig from '../config/database';

const models = [Usuario, Carrinho, UsuarioCarrinho, Pista, Setor];

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
