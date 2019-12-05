import Log from '../models/Log';
import Tentativa from '../models/Tentativa';
import Setor from '../models/Setor';
import Pista from '../models/Pista';
import CalibracaoCarrinho from '../models/CalibracaoCarrinho';
import Carrinho from '../models/Carrinho';
import DadoLog from '../models/DadoLog';
import TipoDadoLog from '../models/TipoDadoLog';

class LogController {
  async index(req, res) {
    const log = await Log.findAll({
      attributes: [
        'id',
        'tempo',
        'quantidade_fora_pista',
        'distancia_percorrida',
      ],
      include: [
        {
          model: Tentativa,
          attributes: ['data', 'descricao'],
        },
        {
          model: DadoLog,
          attributes: ['erro', 'tempo'],
          include: [
            {
              model: TipoDadoLog,
              attributes: ['nome', 'discricao'],
            },
          ],
        },
        {
          model: CalibracaoCarrinho,
          attributes: ['nome'],
          include: [
            {
              model: Setor,
              attributes: ['tamanho'],
              include: [
                {
                  model: Pista,
                  attributes: ['nome', 'quantidade_setores', 'valor_linha'],
                },
              ],
            },
            {
              model: Carrinho,
              attributes: ['nome'],
            },
          ],
        },
      ],
    });
    return res.json(log);
  }

  async show(req, res) {
    const logs = await Log.findAll({
      where: { fk_CalibracaoCarrinho_id: req.params.id },
      attributes: [
        'id',
        'tempo',
        'quantidade_fora_pista',
        'distancia_percorrida',
      ],
      include: [
        {
          model: Tentativa,
          attributes: ['data', 'descricao'],
        },
        {
          model: DadoLog,
          attributes: ['erro', 'tempo'],
          include: [
            {
              model: TipoDadoLog,
              attributes: ['nome', 'discricao'],
            },
          ],
        },
        {
          model: CalibracaoCarrinho,
          attributes: ['nome'],
          include: [
            {
              model: Setor,
              attributes: ['tamanho'],
              include: [
                {
                  model: Pista,
                  attributes: ['nome', 'quantidade_setores', 'valor_linha'],
                },
              ],
            },
            {
              model: Carrinho,
              attributes: ['nome'],
            },
          ],
        },
      ],
    });
    const log = logs[0];
    return res.json(log);
  }
}

export default new LogController();
