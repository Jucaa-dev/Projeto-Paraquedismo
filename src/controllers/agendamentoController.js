import * as agendamentoServices from "../services/agendamentoServices.js";
import Joi from "joi";

export const agendamentoCreateSchema = Joi.object ({
    idAgendamento: Joi.string().required(),
    dataAgendamento: Joi.date().required(),
    horario: Joi.hour().required(),
    status: Joi.string().required()
});

export const agendamentoUpdateScheme = Joi.object ({
    dataAgendamento: Joi.date(),
    horario: Joi.hour(),
    status: Joi.string()
}).min(1);

export const listarAgendamento = async (req, res) => {
    try {
        const {idAgendamento, dataAgendamento, horario} = req.query;
        const agendamento = await agendamentoServices.findAll(idAgendamento, dataAgendamento, horario);
        if (agendamento.length === 0) {
            return res.status(404).json({ message:
            "Nenhum curso encontrado com esses filtros."});
        }
        res.status(200).json(agendamento);
    }catch (err) {
        console.error(`Erro ao buscar agendamentos:`,err);
        res.status(500).json({ error: `Erro interno do servidor`});
    }
};

export const adicionarAgendamento = async (req, res) =>{
    try{
        const novoAgendamento = await agendamentoServices.create(req.body);
        res.status(201).json({ message: 'Agendamento adicionado com sucesso', data:
            novoAgendamento });
    }catch (err) {
        console.error(`Erro ao adicionar agendemento:`,err);
        if(err.code === `ER_DUP_ENTRY`){
            return res.status(409).json({error:'ID já agendado.'});
        }
        res.status(500).json({ error: 'Erro ao adicionar Agendamento'});
    }
};