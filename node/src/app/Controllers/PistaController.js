import * as Yup from 'yup';
import Pista from '../models/Pista';
import File from '../models/File';

class PistaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      quantidade_setores: Yup.string().required(),
      valor_linha: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { nome, quantidade_setores, valor_linha } = req.body;

    const trackExitis = await Pista.findOne({ where: { nome } });

    if (trackExitis) {
      return res.status(400).json({ erro: 'Pista já cadastrada' });
    }

    const { id } = await Pista.create({
      nome,
      quantidade_setores,
      valor_linha,
    });

    return res.json({
      id,
      nome,
      quantidade_setores,
      valor_linha,
    });
  }

  async index(req, res) {
    const pistas = await Pista.findAll({
      attributes: ['id', 'nome', 'quantidade_setores'],
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'name', 'url'],
        },
      ],
    });
    return res.json(pistas);
  }
}

export default new PistaController();
