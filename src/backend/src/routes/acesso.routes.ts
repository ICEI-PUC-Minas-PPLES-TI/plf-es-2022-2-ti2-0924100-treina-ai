import { Router } from 'express';
import AcessoController from '../controllers/acessomodulo.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

// router.get('/', ModuloController.getModulo);
router.get('/usuario', AcessoController.getAcessosAprendiz);
router.post('/Cadastrar', AcessoController.cadastrarAcesso);

export default router;