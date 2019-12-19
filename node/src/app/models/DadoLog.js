import Sequelize, { Model } from 'sequelize';
import Log from './Log';
import TipoDadoLog from './TipoDadoLog';

class DadoLog extends Model {
  static init(sequelize) {
    super.init(
      {
        erro: Sequelize.FLOAT,
        tempo: Sequelize.FLOAT,
        fk_TipoDado_id: {
          type: Sequelize.INTEGER,
          references: {
            model: TipoDadoLog,
            key: 'id',
          },
        },
        fk_Log_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Log,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'DadoLog',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Log, {
      foreignKey: 'fk_Log_id',
    });
    this.belongsTo(models.TipoDadoLog, {
      foreignKey: 'fk_TipoDado_id',
    });
  }
}

export default DadoLog;
