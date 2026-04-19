import express from 'express';
import * as saltoDeParaquedasController from '../controllers/saltoDeParaquedasController.js';
import validate from '../middlewares/validate.js'
import { saltoDeParaquedasCreateSchema, saltoDeParaquedasUpdateSchema } from '../controllers/saltoDeParaquedasController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; //1. Importar o middleware
const router = express.Router();

//A rota de criação de curso (registro) continua pública
router.post('/', validate(saltoDeParaquedasCreateSchema), saltoDeParaquedasController.adicionarSaltoDeParaquedas);//Rota final: POST/api/cursos

//2. Aplica o proteção do login em todas as rotas abaixo desta linha
//router.use(authMiddleware);// //descomentar para funcionar

// O caminho base '/api/cursos' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', '/:cpf', etc.
router.get('/', saltoDeParaquedasController.listarSaltoDeParaquedas); //Rota final: GET / api/cursos

router.put('/:id', validate(saltoDeParaquedasUpdateSchema), saltoDeParaquedasController.atualizarSaltodeParaquedas); //Rota final: PUT /api/cursos/:cpf
router.delete('/:id', saltoDeParaquedasController.deletarSaltodeParaquedas); //Rota final: DELETE /api/cursos/:id
export default router;