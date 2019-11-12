import Sequelize, { Model } from 'sequelize';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        tipo_motor: Sequelize.STRING,
        tipo_roda: Sequelize.STRING,
        quantidade_rodas: Sequelize.INTEGER,
        quantidade_motores: Sequelize.INTEGER,
        quantidade_sensores: Sequelize.INTEGER,
        comprimento: Sequelize.FLOAT,
        largura: Sequelize.FLOAT,
      },
      {
        sequelize,
        tableName: 'Carrinho',
      }
    );
  }
}

export default Usuario;
