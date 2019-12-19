import Sequelize, { Model } from 'sequelize';
import CalibracaoCarrinho from './CalibracaoCarrinho';
import TipoDadoCalibracaoCarrinho from './TipoDadoCalibracaoCarrinho';

class DadoCalibracaoCarrinho extends Model {
  static init(sequelize) {
    super.init(
      {
        valor: Sequelize.STRING,
        fk_TipoDadoCalibracaoCarrinho_id: {
          type: Sequelize.INTEGER,
          references: {
            model: TipoDadoCalibracaoCarrinho,
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
        tableName: 'DadoCalibracaoCarrinho',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.CalibracaoCarrinho, {
      foreignKey: 'fk_CalibracaoCarrinho_id',
    });
    this.belongsTo(models.TipoDadoCalibracaoCarrinho, {
      foreignKey: 'fk_TipoDadoCalibracaoCarrinho_id',
    });
  }
}

export default DadoCalibracaoCarrinho;
