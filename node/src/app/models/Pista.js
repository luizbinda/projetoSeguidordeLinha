import Sequelize, { Model } from 'sequelize';

class Pista extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        quantidade_setores: Sequelize.INTEGER,
        valor_linha: Sequelize.FLOAT,
      },
      {
        sequelize,
        tableName: 'Pista',
      }
    );
  }
}

export default Pista;
