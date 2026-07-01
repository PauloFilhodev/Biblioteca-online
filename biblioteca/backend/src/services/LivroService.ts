import { LivroModel } from "../models/LivroModel"

export class LivroService {
    static async buscarLivros()
    {
        // Aplicação das regras de negócio
        return await LivroModel.buscarLivros();
    }

    static buscarLivro(id: number) {

    }

    static cadastrarLivro()
    {

    }

    static deletarLivro()
    {

    }


}