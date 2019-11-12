import Sequelize, { Model } from 'sequelize';
import Carrinho from './Carrinho';
import TipoDadoCalibracaoCarrinho from './TipoDadoCalibracaoCarrinho';

class DadoCalibracaoCarrinho extends Model {
  static init(sequelize) {
    super.init(
      {
        valor: Sequelize.STRING,
        fk_TipoDadoCalibracaoCarrinho_id: {
          type: Sequelize.INTEGER,
          references: {
            model: TipoDadoCalibracaoCarrinho,
            key: 'id',
          },
        },
        fk_CalibracaoCarrinho_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Carrinho,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'DadoCalibracaoCarrinho',
      }
    );
  }
}

export default DadoCalibracaoCarrinho;
