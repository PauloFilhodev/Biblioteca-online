import { LivroController } from "../controllers/LivroController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router(); // Mini app do express
 
// Separação e direcionamento de rotas para o Controller (próxima camada) receber a requisição e retornar uma resposta
router.get('/', LivroController.buscarLivros);
router.get('/:id', LivroController.buscarLivro);
router.post('/', 
    AuthMiddleware.autenticar, 
    LivroController.cadastrarLivro
);
router.delete('/:id',
    AuthMiddleware.autenticar,
    LivroController.deletarLivro
    );
router.put('/:id', 
    AuthMiddleware.autenticar,
    LivroController.editarLivro
);

export default router;