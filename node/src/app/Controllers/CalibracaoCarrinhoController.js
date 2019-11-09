import * as Yup from 'yup';
import Carrinho from '../models/Carrinho';
import DadosCalibracaoCarrinho from '../models/DadosCalibracaoCarrinho';
import TipoDadoCalibracaoCarrinho from '../models/TipoDadoCalibracaoCarrinho';
import CalibracaoCarrinho from '../models/CalibracaoCarrinho';

class SetorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      carrinho: Yup.string().required(),
      dados: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'erro de validação' });
    }

    const { nome, carrinho, dados } = req.body;

    const carExitis = await Carrinho.findOne({ where: { nome: carrinho } });
    
    if (!carExitis) {
        return res.status(400).json({ erro: 'Carrinho não cadastrado' });
    }

    const car_id = carExitis.id;

    calibrationExitis = await CalibracaoCarrinho.findOne({ where: { nome, fk_Carrinho_id: car_id } });

    if (calibrationExitis) {
        return res.status(400).json({ erro: 'Essa calibração já existe' });
    }

    const { id } = await CalibracaoCarrinho.create({
        nome,
        fk_Carrinho_id: car_id

    });

    dados.forEach(dado => {
        const nomeDado = dado.nome;
        const descricaoDado = dado.descricao;
        const valorDado = dado.valor;
        
        dadoExitis = await TipoDadoCalibracaoCarrinho.findOne({ where: { nome: nomeDado } });
        
        if(!dadoExitis){
            await TipoDadoCalibracaoCarrinho.create({
                nome: nomeDado,
                descricao: descricaoDado,
            });
        }
        
        const dado_id = dadoExitis ? dadoExitis.id : {id} = await TipoDadoCalibracaoCarrinho.create({
            nome: nomeDado,
            descricao: descricaoDado,
        });
        
        valorExitis = await DadosCalibracaoCarrinho.findOne({
            where: { 
                nome: valorDado,
                fk_TipoDadoCalibracaoCarrinho_id: dado_id,
            } 
        });

        if(!valorExitis){
            await DadosCalibracaoCarrinho.create({
                valor: valorDado,
                fk_TipoDadoCalibracaoCarrinho_id: dado_id,
                fk_CalibracaoCarrinho_id: id,
            })
        }
   
    });

    return res.json({
      id,
      nome,
      car_id,
    });
  }
}

export default new SetorController();
