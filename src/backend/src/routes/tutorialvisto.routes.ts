import { Router } from 'express';
import VistoController from '../controllers/tutorialvisto.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();


router.post('/Cadastrar', VistoController.cadastrarTutorialVisto);
router.post('/Verificar', VistoController.VerificarTutorialVisto);
router.post('/Modulo', VistoController.VerificarTutorialVistoPorModulo);

export default router;