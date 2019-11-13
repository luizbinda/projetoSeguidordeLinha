/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';
import Carrinho from '../models/Carrinho';
import DadoCalibracaoCarrinho from '../models/DadoCalibracaoCarrinho';
import TipoDadoCalibracaoCarrinho from '../models/TipoDadoCalibracaoCarrinho';
import CalibracaoCarrinho from '../models/CalibracaoCarrinho';

class CalibrationCarController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      carrinho: Yup.string().required(),
      dados: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { nome, carrinho, dados } = req.body;

    const carExitis = await Carrinho.findOne({ where: { nome: carrinho } });

    if (!carExitis) {
      return res.status(400).json({ erro: 'Carrinho não cadastrado' });
    }

    const car_id = carExitis.id;

    const calibrationExitis = await CalibracaoCarrinho.findOne({
      where: { nome, fk_Carrinho_id: car_id },
    });

    if (calibrationExitis) {
      return res.status(400).json({ erro: 'Essa calibração já existe' });
    }

    const { id } = await CalibracaoCarrinho.create({
      nome,
      fk_Carrinho_id: car_id,
    });

    for (const dado of dados) {
      const nomeDado = dado.nome;
      const descricaoDado = dado.descricao;
      const valorDado = dado.valor;

      let dadoExitis = await TipoDadoCalibracaoCarrinho.findOne({
        where: { nome: nomeDado },
      });

      if (!dadoExitis) {
        await TipoDadoCalibracaoCarrinho.create({
          nome: nomeDado,
          discricao: descricaoDado,
        });
      }

      dadoExitis = await TipoDadoCalibracaoCarrinho.findOne({
        where: { nome: nomeDado },
      });

      await DadoCalibracaoCarrinho.create({
        valor: valorDado,
        fk_TipoDadoCalibracaoCarrinho_id: dadoExitis.id,
        fk_CalibracaoCarrinho_id: id,
      });
    }

    return res.json({
      id,
      nome,
      car_id,
    });
  }

  async index(req, res) {
    const carrinhos = await CalibracaoCarrinho.findAll({
      attributes: ['nome'],
      include: [
        {
          model: Carrinho,
          attributes: ['nome'],
        },
        {
          model: DadoCalibracaoCarrinho,
          attributes: ['valor'],
          include: [
            {
              model: TipoDadoCalibracaoCarrinho,
              attributes: ['nome'],
            },
          ],
        },
      ],
    });
    return res.json(carrinhos);
  }
}

export default new CalibrationCarController();
