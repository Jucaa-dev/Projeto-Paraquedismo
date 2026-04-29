import mysql from 'mysql2/promise';
//criação do pool de conexões
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
//funçao de teste de conexao auto-executavel
(async () => {
    try {
        const connection = await db.getConnection();  
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    } })();

// USANDO 'export default' PARA EXPORTAR A INSTÂNCIA DO POOL DE CONEXÕES.
export default db;