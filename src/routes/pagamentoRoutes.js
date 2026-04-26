import express from 'express';
import * as pagamentoController from '../controllers/pagamentoController.js';
import validate from '../middlewares/validate.js'
import { pagamentoCreateSchema, pagamentoUpdateSchema } from '../controllers/pagamentoController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; //1. Importar o middleware
const router = express.Router();

//A rota de criação de curso (registro) continua pública
router.post('/', validate(pagamentoCreateSchema), pagamentoController.adicionarPagamento);//Rota final: POST/api/cursos

//2. Aplica o proteção do login em todas as rotas abaixo desta linha
//router.use(authMiddleware);// //descomentar para funcionar

// O caminho base '/api/cursos' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', '/:cpf', etc.
router.get('/', pagamentoController.listarPagamento); //Rota final: GET / api/cursos

router.put('/:id', validate(pagamentoUpdateSchema), pagamentoController.atualizarPagamento); //Rota final: PUT /api/cursos/:cpf
router.delete('/:id', pagamentoController.deletarPagamento); //Rota final: DELETE /api/cursos/:id
export default router;