import { Router } from "express";
import { EmprestimosController } from "../controllers/EmprestimosController";
const router = Router();

router.get('/', EmprestimosController.listarEmprestimos);
router.get('/:id', EmprestimosController.listarEmprestimo);
router.get('/usuario/:id', EmprestimosController.emprestimosUsuario);
router.get('/livro/:id', EmprestimosController.emprestimosLivro);
router.post('/', EmprestimosController.cadastrarEmprestimo);
router.post('/:id/devolver', EmprestimosController.devolverLivro);


export default router;