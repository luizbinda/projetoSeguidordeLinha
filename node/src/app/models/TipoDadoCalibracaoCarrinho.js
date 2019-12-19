import Sequelize, { Model } from 'sequelize';

class TipoDadoCalibracaoCarrinho extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        discricao: {
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

  static associate(models) {
    this.hasMany(models.DadoCalibracaoCarrinho, {
      foreignKey: 'fk_TipoDadoCalibracaoCarrinho_id',
    });
  }
}

export default TipoDadoCalibracaoCarrinho;
