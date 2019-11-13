import Sequelize, { Model } from 'sequelize';
import Pista from './Pista';

class Setor extends Model {
  static init(sequelize) {
    super.init(
      {
        tamanho: Sequelize.FLOAT,
        fk_Pista_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Pista,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'Setor',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pista, { foreignKey: 'fk_Pista_id' });
    this.hasMany(models.SetorCalibracaoCarrinho, {
      foreignKey: 'fk_Setor_id',
    });
  }
}

export default Setor;
