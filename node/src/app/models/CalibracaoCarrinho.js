import Sequelize, { Model } from 'sequelize';
import Carrinho from './Carrinho';
import Setor from './Setor';

class CalibracaoCarrinho extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        data: Sequelize.STRING,
        fk_Carrinho_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Carrinho,
            key: 'id',
          },
        },
        fk_Setor_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Setor,
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
    this.belongsTo(models.Setor, { foreignKey: 'fk_Setor_id' });
    this.hasMany(models.DadoCalibracaoCarrinho, {
      foreignKey: 'fk_CalibracaoCarrinho_id',
    });
  }
}

export default CalibracaoCarrinho;
