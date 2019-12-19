import Sequelize, { Model } from 'sequelize';

class TipoDadoLog extends Model {
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
        tableName: 'TipoDadoLog',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.DadoLog, {
      foreignKey: 'fk_TipoDadoLog_id',
    });
  }
}

export default TipoDadoLog;
