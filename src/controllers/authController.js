import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as clienteServices from '../services/clienteServices.js';
export const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        //1. Verificar se o usuário existe no banco de dados 
        const cliente = await clienteServices.findByEmail(email);
        if (!cliente) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
        //2. Comparar a senha enviada com o hash salvo no banco
        const senhaValida = await bcrypt.compare(senha, cliente.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
        //3. Gerar o Token JWT
        // O 'payload' são as informação que queremos guardar o token 
        const payload = { cpf: cliente.cpf, email: cliente.email };
        // O token é assinado com a nossa chave secreta do .env
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token expira em 1 hora
        });

        // 4. Enviar o token para o cliente
        res.json({ message: "Login bem-sucedido!", token: token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
}