import * as Yup from 'yup';
import User from '../models/Carrinho';

class CarrinhoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      tipo_motor: Yup.string().required(),
      tipo_roda: Yup.string().required(),
      quantidade_rodas: Yup.number().required(),
      quantidade_motores: Yup.number().required(),
      quantidade_sensores: Yup.number().required(),
      comprimento: Yup.number().required(),
      largura: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const {
      nome,
      tipo_motor,
      tipo_roda,
      quantidade_motores,
      quantidade_rodas,
      quantidade_sensores,
      comprimento,
      largura,
    } = req.body;

    const carExitis = await User.findOne({ where: { nome } });

    if (carExitis) {
      return res.status(400).json({ erro: 'Carriho já cadastrado' });
    }

    const { id } = await User.create({
      nome,
      tipo_motor,
      tipo_roda,
      quantidade_motores,
      quantidade_rodas,
      quantidade_sensores,
      comprimento,
      largura,
    });

    return res.json({
      id,
      nome,
      tipo_motor,
      tipo_roda,
      quantidade_motores,
      quantidade_rodas,
      quantidade_sensores,
      comprimento,
      largura,
    });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new CarrinhoController();
