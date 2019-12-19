import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'File',
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Pista, { foreignKey: 'fk_files_id' });
  }
}

export default File;
