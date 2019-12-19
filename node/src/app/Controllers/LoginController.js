import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/Usuario';
import auth from '../../config/auth';

class LoginController {
  async store(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { login, senha } = req.body;

    const user = await User.findOne({ where: { login } });

    if (!user) {
      return res.status(400).json({ erro: 'Usuario não encontrado' });
    }

    if (!(await user.checkPassword(senha))) {
      return res.status(400).json({ erro: 'Senha Incorreta' });
    }

    const { id } = user;

    return res.json({
      user: {
        id,
        login,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expireIn,
      }),
    });
  }
}

export default new LoginController();
