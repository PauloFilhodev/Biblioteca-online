import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
const router = Router();

router.get('/usuario/:id', UsuarioController.buscarUsuario);
router.post('/', UsuarioController.cadastrarUsuario);
router.delete('/usuario/:id', UsuarioController.deletarUsuario);
router.put('/usuario/:id', UsuarioController.editarUsuario);

export default router;