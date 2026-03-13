import * as paraquedistaServices from "../services/paraquedistaServices.js";
import Joi from "joi";

export const paraquedistaCreateSchema = Joi.object ({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().required().max(100),
    telefone: Joi.string().required(),
});

export const paraquedistaUpdateSchema = Joi.object ({
    nome: Joi.string().required().max(100),
    telefone: Joi.string().required(),
}).min(1);

export const adicionarParaquedista = async (req, res) =>{
    try{
        const novoParaquedista = await paraquedistaServices.create(req.body);
        res.status(201).json({ message: 'Paraquedista adicionado com sucesso', data:
            novoParaquedista });
    }catch (err) {
        console.error(`Erro ao adicionar Paraquedista:`,err);
        if(err.code === `ER_DUP_ENTRY`){
            return res.status(409).json({error:'CPF já cadastrado.'});
        }
        res.status(500).json({ error: 'Erro ao adicionar Paraquedista'});
    }
};

export const atualizarParaquedista = async (req, res) => {
    try {
        const { cpf } = req.params;
        const updated = await paraquedistaServices.update(cpf, req.body);
        if (!updated) {
           return res.status(404).json({ error: 'Paraquedista não encontrado'}); 
        }
        res.status(200).json({ message: 'Paraquedista atualizado com sucesso'});
    } catch (err) {
      console.error('Erro ao atualizar Paraquedista:', err);
      res.status(500).json({ error: 'Erro ao atualizar paraquedista'});
    }
};

export const deletarParaquedista = async (req, res) => {
    try {
        const { cpf } = req.params;
        const deleted = await paraquedistaServices.remove(cpf);
        if (!deleted) {
          return res.status(400).json({ error: 'Paraquedista não encontrado'});  
        }
        res.status(200).json({ message: 'Paraquedista deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar Paraquedista:', err);
        res.status(500).json({ error: 'Erro ao deletar paraquedista'});
    }
};