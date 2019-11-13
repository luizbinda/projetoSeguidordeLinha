import Sequelize, { Model } from 'sequelize';

class Pista extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        quantidade_setores: Sequelize.INTEGER,
        valor_linha: Sequelize.FLOAT,
      },
      {
        sequelize,
        tableName: 'Pista',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Setor, { foreignKey: 'fk_Pista_id' });
    this.belongsTo(models.File, { foreignKey: 'fk_files_id' });
  }
}

export default Pista;
