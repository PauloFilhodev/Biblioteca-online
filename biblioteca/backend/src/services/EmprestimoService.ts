import { CadastroEmprestimo } from "../interfaces/CadastroEmprestimo";
import { EmprestimoModel } from "../models/EmprestimoModel";
import { UsuarioModel } from "../models/UsuarioModel";
import { LivroModel } from "../models/LivroModel";
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
    static async devolverLivro() {

    }
    static async emprestimosUsuario() {

    }
    static async emprestimosLivro() {

    }
}