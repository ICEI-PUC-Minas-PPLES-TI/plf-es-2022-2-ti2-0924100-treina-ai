import { Router } from 'express';
import TutoriaisController from '../controllers/tutoriais.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();


router.post('/', TutoriaisController.cadastrarTutoriais);
router.post('/Modulo', TutoriaisController.getTutoriais);
router.delete('/Apagar', TutoriaisController.apagarTutorial);

export default router;