import { join } from 'path';
import db from '../db/db.js';

export const findAll = async (idPagamento, valor, dataPagamento, metodoPagamento, statusPagamento ) => {
    let sql = 'SELECT * FROM pagamento';

    const conditions = [];

    const values = [];

    if (valor) {
        conditions.push('LOWER(valor) LIKE ? ')
        values.push(`%${valor.toLowerCase()}%`)
    }

    if (dataPagamento) {
        conditions.push('LOWER(dataPagamento) LIKE ? ')
        values.push(`%${dataPagamento.toLowerCase()}%`)
    }
    if (idPagamento) {
        conditions.push('LOWER(idPagamento) LIKE ? ')
        values.push(`%${idPagamento.toLowerCase()}%`)
    }
    if (metodoPagamento) {
        conditions.push('LOWER(metodoPagamento) LIKE ? ')
        values.push(`%${metodoPagamento.toLowerCase()}%`)
    }
    if (statusPagamento) {
        conditions.push('LOWER(statusPagamento) LIKE ? ')
        values.push(`%${statusPagamento.toLowerCase()}%`)
    }

    if (conditions.length > 0) {
        sql += ' Where ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows
};

export const create = async (pagamento) => {
    await db.query ('INSERT INTO curso SET ?', pagamento);
    return pagamento
};

export const update = async (pagamento, pagamentoData) => {
    const [result] = await db.query('UPDATE pagamento SET ? WHERE idPagamento = ?', [pagamentoData, pagamento]);
    return result.affectedRows > 0;
}

export const remove = async (idPagamento) => {
    const [result] = await db.query('DELETE FROM pagamento WHERE idPagamento = ?', [idPagamento]);
    return result.affectedRows > 0;
}