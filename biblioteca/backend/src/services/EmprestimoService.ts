import { CadastroEmprestimo } from "../interfaces/CadastroEmprestimo";
import { EmprestimoModel } from "../models/EmprestimoModel";
import { UsuarioModel } from "../models/UsuarioModel";
import { LivroModel } from "../models/LivroModel";
import { ResultSetHeader } from "mysql2";
import { ServiceResult } from "../interfaces/ServiceResult";
import { EmprestimoErro } from "../interfaces/EmprestimoErro";
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

    static async cadastrarEmprestimo(emprestimo: CadastroEmprestimo) {
        const usuarioExistente = await UsuarioModel.buscarUsuario(emprestimo.usuario_id);
        console.log("Usuário:", usuarioExistente);

        const livroExistente = await LivroModel.buscarLivro(emprestimo.livro_id);
        console.log("Livro:", livroExistente);

        if (usuarioExistente == null || livroExistente == null) {
            console.log("Entrou no IF 1");
            return null;
        }

        if (livroExistente.quantidade <= 0) {
            console.log("Entrou no IF 2");
            return null;
        }

        const emprestimoExistente = await EmprestimoModel.buscarEmprestimoAtivo(
            emprestimo.usuario_id,
            emprestimo.livro_id
        );

        console.log("Emprestimo existente:", emprestimoExistente);

        if (emprestimoExistente != null) {
            console.log("Entrou no IF 3");
            return null;
        }

        const result = await EmprestimoModel.cadastrarEmprestimo(emprestimo);
        console.log(result);

        if (result.affectedRows == 0) {
            console.log("Entrou no IF 4");
            return null;
        }

        await LivroModel.diminuirQuantidade(emprestimo.livro_id);

        return result;
    }

    static async devolverLivro(id: number): Promise<ServiceResult<ResultSetHeader>>
    {
        const emprestimoExistente = await EmprestimoModel.listarEmprestimo(id);

        if (emprestimoExistente == null)
        {
            return { 
                sucesso: false,
                erro: EmprestimoErro.NAO_EXISTE
            }
        }

        if (emprestimoExistente.status == "devolvido")
        {
            return {
                sucesso: false,
                erro: EmprestimoErro.JA_DEVOLVIDO
            }
        }

        const result = await EmprestimoModel.devolverLivro(id);

        if (result.affectedRows == 0)
        {
            return {
                sucesso: false,
                erro: EmprestimoErro.ERRO_BANCO
            }
        }

        await LivroModel.aumentarQuantidade(emprestimoExistente.livro_id);

        return {
            sucesso: true,
            dados: result
        };
    }


    static async emprestimosUsuario() {

    }
    static async emprestimosLivro() {

    }
}