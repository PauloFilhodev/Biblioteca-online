import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
const router = Router();

router.post('/', UsuarioController.cadastrarUsuario);
router.get('/usuario/:id',
    AuthMiddleware.autenticar,
    UsuarioController.buscarUsuario
    );
router.delete('/usuario/:id',
    AuthMiddleware.autenticar,
    UsuarioController.deletarUsuario
    );
router.put('/usuario/:id',
    AuthMiddleware.autenticar,
    UsuarioController.editarUsuario
);

export default router;