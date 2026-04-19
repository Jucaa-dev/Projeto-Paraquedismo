import * as agendamentoServices from "../services/agendamentoServices.js";
import Joi from "joi";

export const agendamentoCreateSchema = Joi.object({
    idAgendamento: Joi.string().required(),
    dataAgendamento: Joi.date().required(),
    horario: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required(),
    status: Joi.string().required()
});

export const agendamentoUpdateSchema = Joi.object({
    dataAgendamento: Joi.date(),
    horario: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required(),
    status: Joi.string()
}).min(1);

export const listarAgendamento = async (req, res) => {
    try {
        const { idAgendamento, dataAgendamento, horario } = req.query;
        const agendamento = await agendamentoServices.findAll(idAgendamento, dataAgendamento, horario);
        if (agendamento.length === 0) {
            return res.status(404).json({
                message:
                    "Nenhum curso encontrado com esses filtros."
            });
        }
        res.status(200).json(agendamento);
    } catch (err) {
        console.error(`Erro ao buscar agendamentos:`, err);
        res.status(500).json({ error: `Erro interno do servidor` });
    }
};

export const adicionarAgendamento = async (req, res) => {
    try {
        const novoAgendamento = await agendamentoServices.create(req.body);
        res.status(201).json({
            message: 'Agendamento adicionado com sucesso', data:
                novoAgendamento
        });
    } catch (err) {
        console.error(`Erro ao adicionar agendemento:`, err);
        if (err.code === `ER_DUP_ENTRY`) {
            return res.status(409).json({ error: 'Data já agendada.' });
        }
        res.status(500).json({ error: 'Erro ao agendar' });
    }
};

export const atualizarAgendamento = async (req, res) => {
    try {
        const { idAgendamento } = req.params;
        const updated = await AgendamentoService.update(idAgendamento, req.body);
        if (!updated) {
            return res.status(404).json({ error: `Agendamento não encontrado`});
        }
        res.status(200).json({ message: `Agendamento atualizado com sucesso` });
    } catch (err) {
        console.error(`Erro ao atualizar Agendamento:`, err);
        res.status(500).json({ error: `Erro ao atualizar Agendamento` });
    }
};

export const deletarAgendamento = async (req, res) => {
    try {
        const { idAgendamento } = req.params;
        const deleted = await agendamentoServices.remove(idAgendamento);
        if (!deleted) {
            return res.status(400).json({ error: 'Agendamento não encontrado' });
        }
        res.status(200).json({ message: 'Agendamento deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar Agendamento:', err);
        res.status(500).json({ error: 'Erro ao deletar Agendamento' });
    }
};