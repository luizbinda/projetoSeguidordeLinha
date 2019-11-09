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
}

export default CalibracaoCarrinho;
