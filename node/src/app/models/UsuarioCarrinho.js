import Sequelize, { Model } from 'sequelize';

import Usuario from './Usuario';
import Carrinho from './Carrinho';

class UsuarioCarrinho extends Model {
  static init(sequelize) {
    super.init(
      {
        fk_Usuario_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Usuario,
            key: 'id',
          },
          primaryKey: true,
        },
        fk_Carrinho_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Carrinho,
            key: 'id',
          },
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: 'Usuario_Carrinho',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'fk_Usuario_id' });
    this.belongsTo(models.Carrinho, { foreignKey: 'fk_Carrinho_id' });
  }
}

export default UsuarioCarrinho;
