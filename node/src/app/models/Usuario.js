import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        login: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        data_entrada: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'Usuario',
      }
    );

    this.addHook('beforeSave', async usuario => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });
    return this;
  }

  checkPassword(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }

  static associate(models) {
    this.hasMany(models.UsuarioCarrinho, { foreignKey: 'fk_Usuario_id' });
  }
}

export default Usuario;
