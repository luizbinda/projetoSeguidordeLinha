import * as Yup from 'yup';
import TipoDadoCalibracaoCarrinho from '../models/TipoDadoCalibracaoCarrinho';

class TipoDadoCalibracao {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      descricao: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { nome, descricao } = req.body;

    const TipoDadoExitis = await TipoDadoCalibracaoCarrinho.findOne({
      where: { nome },
    });

    if (TipoDadoExitis) {
      return res.status(400).json({ erro: 'Tipo Dado já cadastrado' });
    }

    await TipoDadoCalibracaoCarrinho.create({
      nome,
      discricao: descricao,
    });

    return res.json({ nome, descricao });
  }
}

export default new TipoDadoCalibracao();
