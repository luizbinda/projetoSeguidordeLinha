import Sequelize, { Model } from 'sequelize';

class Carrinho extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        tipo_motor: Sequelize.STRING,
        tipo_roda: Sequelize.STRING,
        quantidade_rodas: Sequelize.INTEGER,
        quantidade_motores: Sequelize.INTEGER,
        quantidade_sensores: Sequelize.INTEGER,
        comprimento: Sequelize.FLOAT,
        largura: Sequelize.FLOAT,
      },
      {
        sequelize,
        tableName: 'Carrinho',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.UsuarioCarrinho, { foreignKey: 'fk_Carrinho_id' });
    this.hasMany(models.CalibracaoCarrinho, { foreignKey: 'fk_Carrinho_id' });
  }
}

export default Carrinho;
