import { Request, Response } from 'express';
import { EmprestimoService } from '../services/EmprestimoService';
import { CadastroEmprestimo } from '../interfaces/CadastroEmprestimo';


export class EmprestimosController {

    static async listarEmprestimos(req: Request, res: Response)
    {
        const param = req.query.estado as string | undefined;

        const result = await EmprestimoService.listarEmprestimos(param);
        
        if (result == null)
        {
            return res.status(200).json([]);
        }

        return res.status(200).json(result);
    }

    static async listarEmprestimo(req: Request, res: Response)
    {
        const emprestimoId = Number(req.params.id);

        if (!emprestimoId)
        {
            return res.status(404).json(
                { message: "ID do empréstimo inválido." }
            );
        }

        const result = await EmprestimoService.listarEmprestimo(emprestimoId);

        if (result == null)
        {
            return res.status(404).json({
                message: "Emprestimo não encontrado"
            })
        }

        return res.status(200).json(result);
    }

    static async cadastrarEmprestimo(req: Request, res: Response)
    {
        const cadastroEmprestimo: CadastroEmprestimo = req.body;

        if (cadastroEmprestimo.usuario_id == null || cadastroEmprestimo.livro_id == null || cadastroEmprestimo.valor_pago == null || !cadastroEmprestimo.data_emprestimo || !cadastroEmprestimo.data_prevista) {
            return res.status(404).json({
                message: "Dados inválidos"
            })
        }

        const result = await EmprestimoService.cadastrarEmprestimo(cadastroEmprestimo);

        if (result == null)
        {
            return res.status(500).json({
                message: "Ocorreu um erro no servidor"
            })
        }

        return res.status(200).json({
            message: "Emprestimo criado com sucesso"
        })
    }

    static async devolverLivro(req: Request, res: Response)
    {

    }

    static async emprestimosUsuario(req: Request, res: Response)
    {

    }

    static async emprestimosLivro(req: Request, res: Response)
    {

    }
}