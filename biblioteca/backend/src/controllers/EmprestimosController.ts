import { Request, Response } from 'express';
import { EmprestimoService } from '../services/EmprestimoService';
import { CadastroEmprestimo } from '../interfaces/CadastroEmprestimo';
import { EmprestimoErro } from '../interfaces/EmprestimoErro';


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
        console.log("Resultado: ", result);    

        if (!result.sucesso)
        {
            switch (result.erro) {
                case EmprestimoErro.NAO_EXISTE:
                    return res.status(404).json({
                        message: "Usuário ou livro não existentes."
                    });
                case EmprestimoErro.SEM_ESTOQUE:
                    return res.status(409).json({
                        message: "Não há exemplares disponíveis para este livro."
                    })
                case EmprestimoErro.ERRO_BANCO:
                    return res.status(500).json({
                        message: "Ocorreu um erro no servidor."
                    })
                default:
                    return res.send(500).json({
                        message: "Erro interno."
                    })
            }
        }

        return res.status(201).json({
            message: "Emprestimo criado com sucesso"
        })
    }

    static async devolverLivro(req: Request, res: Response)
    {
        const idEmprestimo = Number(req.params.id);

        if (!Number.isInteger(idEmprestimo) || idEmprestimo <= 0)
        {
            return res.status(400).json({
                message: "Id inválido"
            })
        }

        const result = await EmprestimoService.devolverLivro(idEmprestimo);
        
        if (!result.sucesso)
        {
            switch (result.erro) {
                case EmprestimoErro.NAO_EXISTE:
                    return res.status(404).json({
                        message: "Empréstimo não encontrado."
                    });
                case EmprestimoErro.JA_DEVOLVIDO:
                    return res.status(409).json({
                        message: "Empréstimo já devolvido."
                    })
                case EmprestimoErro.ERRO_BANCO:
                    return res.status(500).json({
                        message: "Erro ao atualizar empréstimo."
                    });
                default:
                    return res.status(500).json({
                        message: "Erro interno."
                    })
            }
        }

        return res.status(200).json({
            message: "Livro devolvido com sucesso."
        });
    }

    static async emprestimosUsuario(req: Request, res: Response)
    {
        const usuarioId = Number(req.params.id);

        if (!Number.isInteger(usuarioId) || usuarioId <= 0)
        {
            return res.status(400).json({
                message: "Id inválido."
            })
        }

        const emprestimos = await EmprestimoService.emprestimosUsuario(usuarioId);

        return res.status(200).json({
            dados: emprestimos
        })
    }

    static async emprestimosLivro(req: Request, res: Response)
    {
        const livroId = Number(req.params.id);

        if (!Number.isInteger(livroId) || livroId <= 0)
        {
            return res.status(400).json({
                message: "Id inválido."
            })
        }

        const emprestimos = await EmprestimoService.emprestimosLivro(livroId);

        return res.status(200).json({
            dados: emprestimos
        })
    }
}