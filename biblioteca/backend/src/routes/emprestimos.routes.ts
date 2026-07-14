import { Router } from "express";
import { EmprestimosController } from "../controllers/EmprestimosController";
const router = Router();

router.get('/', EmprestimosController.listarEmprestimos);
router.get('/:id', EmprestimosController.listarEmprestimo);
router.post('/', EmprestimosController.cadastrarEmprestimo);
router.put('/:id/devolver', EmprestimosController.devolverLivro);


export default router;