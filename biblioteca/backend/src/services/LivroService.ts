import { RowDataPacket } from "mysql2";
import { ServiceResult } from "../interfaces/ServiceResult"
import { Livro } from "../interfaces/Livro";
import { LivroModel } from "../models/LivroModel"
import { ListaPaginada } from "../interfaces/ListaPaginada";
// Service é uma camada que conversa com o Model e aplica as regras de negócio
export class LivroService {
    // Aplicação das regras de negócio
    static async buscarLivros(pagina: number, limite: number): Promise<ListaPaginada<Livro>>
    {
        const offset = (pagina - 1) * limite;
        const livros = await LivroModel.buscarLivros(limite, offset);

        const total = await LivroModel.quantidadeLivros();

        return {
            dados: livros,
            paginacao: {
                pagina,
                limite: limite,
                total: total,
                totalPaginas: Math.ceil(total / limite)
            }
        } 
    }

    static async buscarLivro(id: number) 
    {
        const livroRetornado = await LivroModel.buscarLivro(id);

        return livroRetornado;
    }

    static async cadastrarLivro(livro: Livro)
    {
        const res = await LivroModel.cadastrarLivro(livro);

        return res;
    }

    static async deletarLivro(id: number)
    {
        const res = await LivroModel.deletarLivro(id);

        return res;
    }

    static async editarLivro(id: number, newLivro: Livro)
    {
        const res = await LivroModel.editarLivro(id, newLivro);

        return res;
    }

}