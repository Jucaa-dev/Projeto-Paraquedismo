import { join } from 'path';
import db from '../db/db.js';

export const findAll = async (idAgendamento, dataAgendamento, horario) => {
    let sql = 'SELECT * FROM agendamento';

    const conditions = [];

    const values = [];

    if (idAgendamento) {
        conditions.push('LOWER(idAgendamento) LIKE ? ')
        values.push(`%${idAgendamento.toLowerCase()}%`)
    }

    if (dataAgendamento) {
        conditions.push('LOWER(dataAgendamento) LIKE ? ')
        values.push(`%${dataAgendamento.toLowerCase()}%`)
    }
    if (horario) {
        conditions.push(`horario = ?`);
        values.push(horario);
    }

    if (conditions.length > 0) {
        sql += ' Where ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows
};

export const create = async (agendamento) => {
    await db.query ('INSERT INTO curso SET ?', agendamento);
    return curso
};

export const update = async (agendamento,agendamentoData) => {
    const [result] = await db.query('UPDATE agendamento SET ? WHERE dataAgendamento = ?', [agendamentoData, agendamento]);
    return result.affectedRows > 0;
}

export const remove = async (idAgendamento) => {
    const [result] = await db.query('DELETE FROM agendamento WHERE idAgendamento = ?', [idAgendamento]);
    return result.affectedRows > 0;
}