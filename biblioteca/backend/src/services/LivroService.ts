import { Livro } from "../interfaces/Livro";
import { LivroModel } from "../models/LivroModel"
// Service é uma camada que conversa com o Model e aplica as regras de negócio
export class LivroService {
    // Aplicação das regras de negócio
    static async buscarLivros()
    {
        return await LivroModel.buscarLivros();
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