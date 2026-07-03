import { Livro } from "../interfaces/Livro";
import { LivroService } from "../services/LivroService";
import { Request, Response } from "express";
// Controller é a camada que recebe a requisição, chama o serviço e retorna uma resposta.
export class LivroController {

    static async buscarLivros(req: Request, res: Response)
    {
        const livrosRetornados = await LivroService.buscarLivros();
        res.status(201).json(livrosRetornados);
    }

    static async buscarLivro(req: Request, res: Response)
    {
        const livroId = Number(req.params.id);

        if (Number.isNaN(livroId)) {
            return res.status(400).json({
                message: "ID inválido."
            })
        }

        const livroRetornado = await LivroService.buscarLivro(livroId);

        if (livroRetornado == null)
        {
            console.log("livro não existente")
            return res.status(404).json({
                message: "Livro não encontrado ou não existente."
            })
        }

        return res.status(201).send(livroRetornado);
    }

    static async cadastrarLivro(req: Request, res: Response) 
    {
        const livro: Livro = req.body;
        
        if (livro.titulo == null || livro.ano_lancamento == null || livro.autor == null || livro.quantidade == null || livro.valor_emprestimo == null) {
            return res.status(400).json({
                message: "Dados inválidos"
            })
        }

        const result = await LivroService.cadastrarLivro(livro);

        if (result.affectedRows === 0) {
            return res.send(500).json({
                message: "Erro ao cadastrar livro"
            })
        }

        return res.status(201).json({
            message: "Livro cadastrado com sucesso",
            id: result.insertId
        })
    }

    static async deletarLivro(req: Request, res: Response)
    {
        const livroId = Number(req.params.id);

        if (livroId == null)
        {
            return res.status(400).json({
                message: "Id inválido"
            })
        }

        const service = await LivroService.deletarLivro(livroId);
        
        if (service.affectedRows === 0)
        {
            return res.status(500).json({
                message: "Erro ao deletar livro"
            })
        }

        res.status(200).json({
            message: "Livro deletado",
            affectRows: service.affectedRows
        })
    }

    static async editarLivro(req: Request, res: Response)
    {
        const livroId = Number(req.params.id);
        const livro: Livro = req.body;

        if (livroId === null)
        {
            return res.status(400).json({
                message: "Id inválido"
            })
        }

        if (livro.titulo == null || livro.ano_lancamento == null || livro.autor == null || livro.quantidade == null || livro.valor_emprestimo == null) {
            return res.status(400).json({
                message: "Dados inválidos"
            })
        }

        const service = await LivroService.editarLivro(livroId, livro);

        if (service.affectedRows === 0)
        {
            return res.status(500).json({
                message: "Erro ao editar livro"
            })
        }

        res.status(200).json({
            message: "Livro editado com sucesso",
            id: service.insertId
        })
    }
}