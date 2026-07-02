import { LivroController } from "../controllers/LivroController";
import { Router } from "express";

const router = Router(); // Mini app do express
 
// Separação e direcionamento de rotas para o Controller (próxima camada) receber a requisição e retornar uma resposta
router.get('/lista', LivroController.buscarLivros);
router.get('/livro/:id', LivroController.buscarLivro);
router.post('/', LivroController.cadastrarLivro);
router.delete('/livro/:id', LivroController.deletarLivro);
router.put('/livro/:id', LivroController.editarLivro);

export default router;