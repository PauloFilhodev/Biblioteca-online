import { LivroController } from "../controllers/LivroController";
import { Router } from "express";

const router = Router(); // Mini app do express

// Requisições /livros
router.get('/lista', LivroController.buscarLivros);

export default router;