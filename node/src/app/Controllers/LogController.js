import Log from '../models/Log';
import Tentativa from '../models/Tentativa';
import SetorCalibracaoCarrinho from '../models/SetorCalibracaoCarrinho';
import Setor from '../models/Setor';
import Pista from '../models/Pista';
import CalibracaoCarrinho from '../models/CalibracaoCarrinho';
import Carrinho from '../models/Carrinho';
import DadoLog from '../models/DadoLog';
import TipoDadoLog from '../models/TipoDadoLog';
import File from '../models/File';

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
          model: SetorCalibracaoCarrinho,
          attributes: ['KI', 'KP', 'KD', 'angulo', 'erro_desejado'],
          include: [
            {
              model: Setor,
              attributes: ['tamanho'],
              include: [
                {
                  model: Pista,
                  attributes: ['nome', 'valor_linha'],
                  include: [
                    {
                      model: File,
                    },
                  ],
                },
              ],
            },
            {
              model: CalibracaoCarrinho,
              attributes: ['nome'],
              include: [
                {
                  model: Carrinho,
                  attributes: [
                    'nome',
                    'tipo_motor',
                    'tipo_roda',
                    'quantidade_rodas',
                    'quantidade_motores',
                    'quantidade_sensores',
                    'comprimento',
                    'largura',
                  ],
                },
              ],
            },
          ],
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
      ],
    });
    return res.json(log);
  }
}

export default new LogController();
