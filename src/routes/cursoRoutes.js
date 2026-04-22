import express from 'express';
import * as cursoController from '../controllers/cursoController.js';
import validate from '../middlewares/validate.js'
import { cursoCreateSchema, cursoUpdateSchema } from '../controllers/cursoController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; //1. Importar o middleware
const router = express.Router();

//A rota de criação de curso (registro) continua pública
router.post('/', validate(cursoCreateSchema), cursoController.adicionarCurso);//Rota final: POST/api/cursos

//2. Aplica o proteção do login em todas as rotas abaixo desta linha
//router.use(authMiddleware);// //descomentar para funcionar

// O caminho base '/api/cursos' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', '/:cpf', etc.
router.get('/', cursoController.listarCurso); //Rota final: GET / api/cursos

router.put('/:id', validate(cursoUpdateSchema), cursoController.atualizarCurso); //Rota final: PUT /api/cursos/:cpf
router.delete('/:id', cursoController.deletarCurso); //Rota final: DELETE /api/cursos/:id
export default router;