import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
const router = Router();

router.get('/me', AuthMiddleware.autenticar, AuthController.me);
router.post('/', AuthController.login);
router.post('/logout', AuthController.logout);

export default router;