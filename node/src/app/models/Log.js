import Sequelize, { Model } from 'sequelize';
import Tentativa from './Tentativa';
import SetorCalibracaoCarrinho from './SetorCalibracaoCarrinho';

class Log extends Model {
  static init(sequelize) {
    super.init(
      {
        tempo: Sequelize.TIME,
        quantidade_fora_pista: Sequelize.FLOAT,
        distancia_percorrida: Sequelize.FLOAT,
        fk_Tentativa_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Tentativa,
            key: 'id',
          },
        },
        fk_Setor_CalibracaoCarrinho_id: {
          type: Sequelize.INTEGER,
          references: {
            model: SetorCalibracaoCarrinho,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'Log',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Tentativa, {
      foreignKey: 'fk_Tentativa_id',
    });
    this.hasMany(models.DadoLog, {
      foreignKey: 'fk_Log_id',
    });
    this.belongsTo(models.SetorCalibracaoCarrinho, {
      foreignKey: 'fk_Setor_CalibracaoCarrinho_id',
    });
  }
}

export default Log;
