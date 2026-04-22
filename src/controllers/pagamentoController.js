import * as cursoServices from "../services/cursoServices.js";
import Joi from "joi";

export const cursoCreateSchema = Joi.object ({
    idPagamento: Joi.string().required(),
    valor: Joi.number().required(),
    dataPagamento: Joi.date().required(),
    metodoPagamento: Joi.string().required(),
    statusPagamento: Joi.string().required(),
    descricao: Joi.string().required()
});

export const cursoUpdateSchema = Joi.object ({
    valor: Joi.number(),
    dataPagamento: Joi.date(),
    metodoPagamento: Joi.string(),
    statusPagamento: Joi.string(),
    descricao: Joi.string()
}).min(1);

export const listarPagamento = async (req, res) => {
    try {
        const {idPagamento, statusPagamento, minValor, maxValor} = req.query;
        const pagamento = await pagamentoServices.findAll(idPagamento,statusPagamento,minValor,maxValor);
        if (pagamento.length === 0) {
            return res.status(404).json({ message:
            "Nenhum pagamento encontrado com esses filtros."});
        }
        res.status(200).json(pagamento);
    }catch (err) {
        console.error(`Erro ao buscar pagamentos:`,err);
        res.status(500).json({ error: `Erro interno do servidor`});
    }
};

export const adicionarPagamento = async (req, res) =>{
    try{
        const novoPagamento = await pagamentoServices.create(req.body);
        res.status(201).json({ message: 'Pagamento adicionado com sucesso', data:
            novoPagamento });
    }catch (err) {
        console.error(`Erro ao adicionar pagamento:`,err);
        if(err.code === `ER_DUP_ENTRY`){
            return res.status(409).json({error:'ID já cadastrado.'});
        }
        res.status(500).json({ error: 'Erro ao adicionar pagamento'});
    }
};

export const atualizarPagamento = async (req, res) => {
    try {
        const { idPagamento } = req.params;
        const updated = await pagamentoServices.update(idPagamento, req.body);
        if (!updated) {
            return res.status(404).json({ error: `pagamento não encontrado`});
        }
        res.status(200).json({ message: `pagamento atualizado com sucesso` });
    } catch (err) {
        console.error(`Erro ao atualizar pagamento:`, err);
        res.status(500).json({ error: `Erro ao atualizar pagamento` });
    }
};

export const deletarPagamento = async (req, res) => {
    try {
        const { idPagamento } = req.params;
        const deleted = await pagamentoServices.remove(idPagamento);
        if (!deleted) {
            return res.status(404).json({ error: `pagamento não encontrado` });
        }
        res.status(200).json({ message: `pagamento deletado com sucesso` });
    } catch (err) {
        console.error(`Erro ao deletar pagamento:`, err);
        res.status(500).json({ error: `Erro ao deletar pagamento` });
    }
};