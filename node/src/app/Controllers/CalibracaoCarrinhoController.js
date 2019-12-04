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
      carrinho: Yup.number().required(),
      dados: Yup.array().required(),
      setor: Yup.number(),
    });

    const data_atual = `${Date.now()}`;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { nome, carrinho, dados, setor } = req.body;

    const carExitis = await Carrinho.findOne({ where: { id: carrinho } });

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
      data: data_atual,
      fk_Carrinho_id: car_id,
      fk_Setor_id: setor,
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
      data_atual,
    });
  }

  async index(req, res) {
    const calibracao = await CalibracaoCarrinho.findAll({
      where: { fk_Carrinho_id: req.params.id },
      attributes: ['id', 'nome', 'data'],
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
    return res.json(calibracao);
  }

  async show(req, res) {
    const calibracao = await CalibracaoCarrinho.findAll({
      where: { fk_Carrinho_id: req.params.id },
      attributes: ['nome', 'data'],
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
      order: [['data', 'DESC']],
      limit: 1,
    });

    const retorno = calibracao[0];
    return res.json(retorno);
  }
}

export default new CalibrationCarController();
