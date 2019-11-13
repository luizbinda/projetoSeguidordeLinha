import Sequelize, { Model } from 'sequelize';
import Setor from './Setor';
import CalibracaoCarrinho from './CalibracaoCarrinho';

class SetorCalibracaoCarrinho extends Model {
  static init(sequelize) {
    super.init(
      {
        KP: Sequelize.FLOAT,
        KD: Sequelize.FLOAT,
        KI: Sequelize.FLOAT,
        angulo: Sequelize.FLOAT,
        velocidade: Sequelize.FLOAT,
        erro_desejado: Sequelize.FLOAT,
        fk_Setor_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Setor,
            key: 'id',
          },
        },
        fk_CalibracaoCarrinho_id: {
          type: Sequelize.INTEGER,
          references: {
            model: CalibracaoCarrinho,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'Setor_CalibracaoCarrinho',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Setor, {
      foreignKey: 'fk_Setor_id',
    });
    this.belongsTo(models.CalibracaoCarrinho, {
      foreignKey: 'fk_CalibracaoCarrinho_id',
    });
    this.hasMany(models.Log, {
      foreignKey: 'fk_Setor_CalibracaoCarrinho_id',
    });
  }
}

export default SetorCalibracaoCarrinho;
