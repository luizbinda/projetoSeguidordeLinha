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
}

export default Setor;
