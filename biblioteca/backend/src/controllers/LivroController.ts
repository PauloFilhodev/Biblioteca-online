import { LivroService } from "../services/LivroService";
import { Request, Response } from "express";

export class LivroController {
    static async buscarLivros(req: Request, res: Response)
    {
        // Recebeu res e req
        const livrosRetornados = await LivroService.buscarLivros();
        res.status(201).json(livrosRetornados);
    }

    static buscarLivro(req: Request, res: Response): void 
    {
        
    }
}