import Sequelize, { Model } from 'sequelize';

class Tentativa extends Model {
  static init(sequelize) {
    super.init(
      {
        Data: Sequelize.DATE,
        descricao: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'Tentativa',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Log, { foreignKey: 'fk_Tentativa_id' });
  }
}

export default Tentativa;
