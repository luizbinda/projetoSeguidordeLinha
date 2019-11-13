import * as Yup from 'yup';
import Carrinho from '../models/Carrinho';
import UsuarioCarrinho from '../models/UsuarioCarrinho';

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

    const carExitis = await Carrinho.findOne({ where: { nome } });

    if (carExitis) {
      return res.status(400).json({ erro: 'Carrinho já cadastrado' });
    }

    const { id } = await Carrinho.create({
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

  async index(req, res) {
    const carrinhos = await UsuarioCarrinho.findAll({
      where: { fk_Usuario_id: req.userId },
      attributes: [],
      include: [
        {
          model: Carrinho,
          attributes: ['id', 'nome'],
        },
      ],
    });
    return res.json(carrinhos);
  }
}

export default new CarrinhoController();
