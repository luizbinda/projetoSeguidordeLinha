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
      login: Yup.string(),
      senhaAntiga: Yup.string().min(6),
      senha: Yup.string()
        .min(6)
        .when('senhaAntiga', (senhaAntiga, field) =>
          senhaAntiga ? field.required() : field
        ),
      confirmarSenha: Yup.string().when('senha', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('senha')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }
    const { login, senhaAntiga, senha } = req.body;

    const id_user = req.userId;
    const user = await User.findByPk(id_user);

    if (login !== user.login) {
      const userExitis = await User.findOne({ where: { login } });

      if (userExitis) {
        return res.status(400).json({ erro: 'Usuario já exite' });
      }
    }

    if (senhaAntiga && !(await user.checkPassword(senhaAntiga))) {
      return res.status(401).json({ erro: 'Senha Incorreta' });
    }

    const { id } = await user.update(req.body);

    return res.json({ id, login, senha });
  }
}

export default new UsuarioController();
