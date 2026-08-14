import { Router } from "express";
import { EmprestimosController } from "../controllers/EmprestimosController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
const router = Router();

router.get('/', AuthMiddleware.autenticar,  EmprestimosController.listarEmprestimos);
router.get('/:id', AuthMiddleware.autenticar,  EmprestimosController.listarEmprestimo);
router.get('/usuario/:id', AuthMiddleware.autenticar,  EmprestimosController.emprestimosUsuario);
router.get('/livro/:id',EmprestimosController.emprestimosLivro);
router.post('/', AuthMiddleware.autenticar, EmprestimosController.cadastrarEmprestimo);
router.post('/:id/devolver', AuthMiddleware.autenticar, EmprestimosController.devolverLivro);


export default router;