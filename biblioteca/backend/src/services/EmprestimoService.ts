import { CadastroEmprestimo } from "../interfaces/CadastroEmprestimo";
import { EmprestimoModel } from "../models/EmprestimoModel";
import { UsuarioModel } from "../models/UsuarioModel";
import { LivroModel } from "../models/LivroModel";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ServiceResult } from "../interfaces/ServiceResult";
import { EmprestimoErro } from "../interfaces/EmprestimoErro";
import pool from "../config/database";
export type EstadoEmprestimo = "Alugado" | "Devolvido" | "Atrasado";


export class EmprestimoService {
    static async listarEmprestimos(param: string | undefined) {
        if (param && !["Alugado", "Atrasado", "Devolvido"].includes(param)) {
            return null;
        }

        return await EmprestimoModel.listarEmprestimos(param as EstadoEmprestimo | null);
    }

    static async listarEmprestimo(id: number) {
        const emprestimoRetornado = await EmprestimoModel.listarEmprestimo(id);

        if (!emprestimoRetornado) {
            return null;
        }

        return emprestimoRetornado;
    }

    static async cadastrarEmprestimo(emprestimo: CadastroEmprestimo): Promise<ServiceResult<ResultSetHeader>> {
        const usuarioExistente = await UsuarioModel.buscarUsuario(emprestimo.usuario_id);
        console.log("Usuário:", usuarioExistente);

        const livroExistente = await LivroModel.buscarLivro(emprestimo.livro_id);
        console.log("Livro:", livroExistente);

        if (usuarioExistente == null || livroExistente == null) {
            console.log("Entrou no IF 1");
            return {
                sucesso: false,
                erro: EmprestimoErro.NAO_EXISTE
            };
        }

        if (livroExistente.quantidade <= 0) {
            console.log("Entrou no IF 2");
            return {
                sucesso: false,
                erro: EmprestimoErro.SEM_ESTOQUE
            };
        }

        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();

            const emprestimoExistente = await EmprestimoModel.buscarEmprestimoAtivo(
                emprestimo.usuario_id,
                emprestimo.livro_id
            );

            console.log("Emprestimo existente:", emprestimoExistente);

            if (emprestimoExistente != null) {
                console.log("Entrou no IF 3");
                return {
                    sucesso: false,
                    erro: EmprestimoErro.NAO_EXISTE
                };
            }

            const result = await EmprestimoModel.cadastrarEmprestimo(connection, emprestimo);
            console.log(result);

            if (result.affectedRows == 0) {
                console.log("Entrou no IF 4");
                return {
                    sucesso: false,
                    erro: EmprestimoErro.ERRO_BANCO
                };
            }

            await LivroModel.diminuirQuantidade(emprestimo.livro_id);

            await connection.commit();

            return {
                sucesso: true,
                dados: result
            };
        } catch (error) {
            await connection.rollback();
            return {
                sucesso: false,
                erro: EmprestimoErro.ERRO_BANCO
            }
        } finally {
            connection.release();
        }
    }

    static async devolverLivro(id: number): Promise<ServiceResult<ResultSetHeader>> {

        const emprestimoExistente = await EmprestimoModel.listarEmprestimo(id);

        if (emprestimoExistente == null) {
            return {
                sucesso: false,
                erro: EmprestimoErro.NAO_EXISTE
            }
        }

        if (emprestimoExistente.status == "devolvido") {
            return {
                sucesso: false,
                erro: EmprestimoErro.JA_DEVOLVIDO
            }
        }

        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();

            const result = await EmprestimoModel.devolverLivro(connection, id);

            if (result.affectedRows == 0) {
                return {
                    sucesso: false,
                    erro: EmprestimoErro.ERRO_BANCO
                }
            }

            await LivroModel.aumentarQuantidade(connection, emprestimoExistente.livro_id);

            await connection.commit();

            return {
                sucesso: true,
                dados: result
            };
        } catch (error) {
            await connection.rollback();

            return {
                sucesso: false,
                erro: EmprestimoErro.ERRO_BANCO
            }
        } finally {
            connection.release();
        }
    }

    static async emprestimosUsuario(id: number)
    {
        return await EmprestimoModel.emprestimosUsuario(id);;
    }

    static async emprestimosLivro(id: number) 
    {
        return await EmprestimoModel.emprestimosLivro(id);
    }
}