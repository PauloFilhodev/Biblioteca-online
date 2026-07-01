import pool from "../config/database";

export class LivroModel {
    static async buscarLivros()
    {
        const [rows] = await pool.query('SELECT * FROM livros;');
        return rows;
    }

    static async cadastrarLivros()
    {
        
    }
}