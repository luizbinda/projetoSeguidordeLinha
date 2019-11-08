import * as Yup from 'yup';
import User from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),
      senha: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { login, senha } = req.body;

    const userExitis = await User.findOne({ where: { login } });

    if (userExitis) {
      return res.status(400).json({ erro: 'Usuario já cadastrado' });
    }

    const data_entrada = new Date();

    const { id } = await User.create({
      login,
      senha,
      data_entrada,
    });

    return res.json({ id, login, senha });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'validation fails' });
    }
    const { email, oldPassword } = req.body;

    const id_user = req.userId;
    const user = await User.findByPk(id_user);

    if (email !== user.email) {
      const userExitis = await User.findOne({ where: { email } });

      if (userExitis) {
        return res.status(400).json({ erro: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ erro: 'Password not Match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, email, name });
  }
}

export default new UsuarioController();
