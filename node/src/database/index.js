import Sequelize from 'sequelize';

import Usuario from '../app/models/Usuario';
import Carrinho from '../app/models/Carrinho';

import databaseConfig from '../config/database';

const models = [Usuario, Carrinho];

class Database {
  constructor() {
    this.init();
    this.associateInit();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach(model => model.init(this.connection));
  }

  associateInit() {
    models.forEach(model => {
      if (model.associate) model.associate(this.connection.models);
    });
  }
}

export default new Database();
