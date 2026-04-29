import * as saltoDeParaquedasServices from "../services/saltoDeParaquedasServices.js";
import Joi from "joi";

export const saltoDeParaquedasCreateSchema = Joi.object ({
    idSalto: Joi.string().required(),
    dataSalto: Joi.date().required(),
    tipo: Joi.string().required(),
    valorTotal: Joi.number().positive().required(),
    status: Joi.string().required(),
    cpf: Joi.string().length(11).required()
});

export const saltoDeParaquedasUpdateSchema = Joi.object ({
    dataSalto: Joi.date(),
    tipo: Joi.string(),
    valorTotal: Joi.number().positive(),
    status: Joi.string()
}).min(1);

export const listarSaltoDeParaquedas = async (req, res) => {
    try {
        const {idSalto, dataSalto, tipo, minValor, maxValor} = req.query;
        const saltoDeParaquedas = await saltoDeParaquedasServices.findAll(idSalto,dataSalto,tipo,minValor,maxValor);
        if (saltoDeParaquedas.length === 0) {
            return res.status(404).json({ message:
            "Nenhum salto de paraquedas encontrado com esses filtros."});
        }
        res.status(200).json(saltoDeParaquedas);
    }catch (err) {
        console.error(`Erro ao buscar saltos de Paraquedas:`,err);
        res.status(500).json({ error: `Erro interno do servidor`});
    }
};

export const adicionarSaltoDeParaquedas = async (req, res) =>{
    try{
        const novoSaltoDeParaquedas = await saltoDeParaquedasServices.create(req.body);
        res.status(201).json({ message: 'Salto de paraquedas adicionado com sucesso', data:
            novoSaltoDeParaquedas });
    }catch (err) {
        console.error(`Erro ao adicionar salto de paraquedas:`,err);
        if(err.code === `ER_DUP_ENTRY`){
            return res.status(409).json({error:'ID já cadastrado.'});
        }
        res.status(500).json({ error: 'Erro ao adicionar salto de paraquedas'});
    }
};

export const atualizarSaltodeParaquedas = async (req, res) => {
    try {
        const { idSalto } = req.params;
        const updated = await saltoDeParaquedasServices.update(idSalto, req.body);
        if (!updated) {
            return res.status(404).json({ error: `SaltodeParaquedas não encontrado`});
        }
        res.status(200).json({ message: `SaltodeParaquedas atualizado com sucesso` });
    } catch (err) {
        console.error(`Erro ao atualizar SaltodeParaquedas:`, err);
        res.status(500).json({ error: `Erro ao atualizar SaltodeParaquedas` });
    }
};

export const deletarSaltodeParaquedas = async (req, res) => {
    try {
        const { idSalto } = req.params;
        const deleted = await saltoDeParaquedasServices.remove(idSalto);
        if (!deleted) {
            return res.status(404).json({ error: `Salto não encontrado` });
        }
        res.status(200).json({ message: `Salto deletado com sucesso` });
    } catch (err) {
        console.error(`Erro ao deletar SaltodeParaquedas:`, err);
        res.status(500).json({ error: `Erro ao deletar Salto` });
    }
};