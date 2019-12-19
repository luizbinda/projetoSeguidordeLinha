import * as Yup from 'yup';
import Pista from '../models/Pista';
import Setor from '../models/Setor';

class SetorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      pista: Yup.number().required(),
      tamanho: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { pista, tamanho } = req.body;

    const trackExitis = await Pista.findByPk(pista);

    if (!trackExitis) {
      return res.status(400).json({ erro: 'Pista não cadastrada' });
    }

    const { id } = await Setor.create({
      tamanho,
      fk_Pista_id: pista,
    });

    return res.json({
      id,
      pista,
      tamanho,
    });
  }

  async index(req, res) {
    const carrinhos = await Setor.findAll({
      where: { fk_Pista_id: req.params.pistaId },
    });
    return res.json(carrinhos);
  }

  async delete(req, res) {
    await Setor.destroy({ where: { id: req.params.setorId } });
    return res.json({ ok: 'foi deletado' });
  }
}

export default new SetorController();
