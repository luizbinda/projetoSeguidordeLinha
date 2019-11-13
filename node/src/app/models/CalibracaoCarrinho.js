import Sequelize, { Model } from 'sequelize';
import Carrinho from './Carrinho';

class CalibracaoCarrinho extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        fk_Carrinho_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Carrinho,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'CalibracaoCarrinho',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Carrinho, { foreignKey: 'fk_Carrinho_id' });
    this.hasMany(models.DadoCalibracaoCarrinho, {
      foreignKey: 'fk_CalibracaoCarrinho_id',
    });
    this.hasMany(models.SetorCalibracaoCarrinho, {
      foreignKey: 'fk_CalibracaoCarrinho_id',
    });
  }
}

export default CalibracaoCarrinho;
