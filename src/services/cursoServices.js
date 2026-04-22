import { join } from 'path';
import db from '../db/db.js';

export const findAll = async (tipo, id, data) => {
    let sql = 'SELECT * FROM curso';

    const conditions = [];

    const values = [];

    if (data) {
        conditions.push('dataCurso = ? ')
        values.push(data)
    }

    if (tipo) {
        conditions.push('LOWER(tipo) LIKE ? ')
        values.push(`%${tipo.toLowerCase()}%`)
    }
    if (id) {
        conditions.push(`idCurso = ?`);
        values.push(id);
    }

    if (conditions.length > 0) {
        sql += ' Where ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows
};

export const create = async (curso) => {
    await db.query ('INSERT INTO curso SET ?', curso);
    return curso
};

export const update = async (curso, cursoData) => {
    const [result] = await db.query('UPDATE curso SET ? WHERE idCurso = ?', [cursoData, curso]);
    return result.affectedRows > 0;
}

export const remove = async (idCurso) => {
    const [result] = await db.query('DELETE FROM curso WHERE idcurso = ?', [idCurso]);
    return result.affectedRows > 0;
}