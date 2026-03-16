import * as cursoServices from "../services/cursoServices.js";
import Joi from "joi";

export const cursoCreateSchema = Joi.object ({
<<<<<<< HEAD
    nome: Joi.string().required.max(50),
    idCurso: Joi.string().required(),
    dataCurso: Joi.date().required(),
    horario: Joi.hour().required(),
=======
    idCurso: Joi.string().required(),
    dataCurso: Joi.date().required(),
>>>>>>> 6af840f299162514811922f7799cdc75b3b6a971
    valorCurso: Joi.number().positive().required(),
    tipo: Joi.string().required()
});

export const cursoUpdateScheme = Joi.object ({
    dataCurso: Joi.date(),
    valorCurso: Joi.number().positive(),
    tipo: Joi.string()
}).min(1);

export const listarCurso = async (req, res) => {
    try {
        const {idCurso, tipo, minValor, maxValor} = req.query;
        const curso = await cursoServices.findAll(idCurso,tipo,minValor,maxValor);
        if (curso.length === 0) {
            return res.status(404).json({ message:
            "Nenhum curso encontrado com esses filtros."});
        }
        res.status(200).json(curso);
    }catch (err) {
        console.error(`Erro ao buscar produtos:`,err);
        res.status(500).json({ error: `Erro interno do servidor`});
    }
};

export const adicionarCurso = async (req, res) =>{
    try{
        const novoCurso = await cursoServices.create(req.body);
        res.status(201).json({ message: 'Curso adicionado com sucesso', data:
            novoCurso });
    }catch (err) {
        console.error(`Erro ao adicionar curso:`,err);
        if(err.code === `ER_DUP_ENTRY`){
            return res.status(409).json({error:'ID já cadastrado.'});
        }
        res.status(500).json({ error: 'Erro ao adicionar Curso'});
    }
};