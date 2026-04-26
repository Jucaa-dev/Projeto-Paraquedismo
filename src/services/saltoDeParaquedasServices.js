import { join } from 'path';
import db from '../db/db.js';

export const findAll = async (idSalto, dataSalto, tipo, minValor, maxValor) => {
    let sql = 'SELECT * FROM saltoDeParaquedas';

    const conditions = [];

    const values = [];

    if (idSalto) {
        conditions.push('LOWER(idSalto) LIKE ? ')
        values.push(`%${idSalto.toLowerCase()}%`)
    }

    if (dataSalto) {
        conditions.push('LOWER(dataSalto) LIKE ? ')
        values.push(`%${dataSalto.toLowerCase()}%`)
    }

    if (tipo) {
        conditions.push('LOWER(tipo) LIKE ? ')
        values.push(`%${tipo.toLowerCase()}%`)
    }

    if (minValor) {
        conditions.push('valorTotal >= ?')
        values.push(minValor)
    }

    if (maxValor) {
        conditions.push('valorTotal <= ?')
        values.push(maxValor)
    }

    if (conditions.length > 0) {
        sql += ' Where ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows
};

export const create = async (saltoDeParaquedas) => {
    await db.query('INSERT INTO saltoDeParaquedas SET ?', saltoDeParaquedas);
    return saltoDeParaquedas
};

export const update = async (curso, saltoDeParaquedasData) => {
    const [result] = await db.query('UPDATE saltoDeParaquedas SET ? WHERE idSalto = ?', [saltoDeParaquedasData, curso]);
    return result.affectedRows > 0;
}

export const remove = async (idSalto) => {
    const [result] = await db.query('DELETE FROM curso WHERE idcurso = ?', [idSalto]);
    return result.affectedRows > 0;
}