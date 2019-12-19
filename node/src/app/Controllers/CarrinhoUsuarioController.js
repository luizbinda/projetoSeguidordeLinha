import * as Yup from 'yup';
import Car from '../models/Carrinho';
import CarUser from '../models/UsuarioCarrinho';

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { nome } = req.body;
    const user_id = req.userId;

    const carExitis = await Car.findOne({ where: { nome } });

    if (!carExitis) {
      return res.status(400).json({ erro: 'Carrinho não cadastrado' });
    }

    const car_id = carExitis.id;
    await CarUser.create({
      fk_Usuario_id: user_id,
      fk_Carrinho_id: car_id,
    });

    return res.json({ user_id, car_id });
  }
}

export default new UsuarioController();
