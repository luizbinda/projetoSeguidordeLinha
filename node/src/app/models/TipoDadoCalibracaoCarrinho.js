import Sequelize, { Model } from 'sequelize';

class TipoDadoCalibracaoCarrinho extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'TipoDadoCalibracaoCarrinho',
      }
    );
  }
}

export default TipoDadoCalibracaoCarrinho;
