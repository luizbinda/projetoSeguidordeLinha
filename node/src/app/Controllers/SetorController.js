import * as Yup from 'yup';
import Pista from '../models/Pista';
import Setor from '../models/Setor';

class SetorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      pista: Yup.string().required(),
      tamanho: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { nome, pista, tamanho } = req.body;

    const sectorExitis = await Setor.findOne({ where: { nome } });

    if (sectorExitis) {
      return res.status(400).json({ erro: 'Setor já cadastrado' });
    }

    const trackExitis = await Pista.findOne({ where: { nome: pista } });

    if (!trackExitis) {
      return res.status(400).json({ erro: 'Pista não cadastrada' });
    }

    const pista_id = trackExitis.id;
    const { id } = await Setor.create({
      nome,
      pista_id,
      tamanho,
    });

    return res.json({
      id,
      nome,
      pista,
      tamanho,
    });
  }
}

export default new SetorController();
