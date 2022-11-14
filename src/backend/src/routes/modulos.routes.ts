import { Router } from 'express';
import ModuloController from '../controllers/modulos.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.get('/', ModuloController.getModulo);
router.get('/Tarefas', ModuloController.getModuloComTarefas);
router.post('/Aprendiz', authMiddleware.autorizarUsuarioByParams,ModuloController.getModulosEspecificos);
router.post('/Cadastrar', ModuloController.cadastrarModulo);

export default router;