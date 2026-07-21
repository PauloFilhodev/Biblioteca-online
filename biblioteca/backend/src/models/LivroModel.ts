import pool from "../config/database";
import { RowDataPacket, ResultSetHeader, Pool, PoolConnection } from "mysql2/promise";
import { Livro } from "../interfaces/Livro";
import { ListaPaginada } from "../interfaces/ListaPaginada";
// Conversa diretamente com o MySQL
export class LivroModel {

    static async buscarLivros(pagina: number, offset: number): Promise<Livro[]>
    {
        const [ rows ] = await pool.query<Livro[]>('SELECT * FROM livros LIMIT ? OFFSET ?', [pagina, offset]);
        return rows;
    }

    static async quantidadeLivros(): Promise<number>
    {
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT COUNT(*) AS total FROM livros"
        );

        return rows[0].total;
    }
    // RowDataPacket é necessário para o Ts entender que o retorno é um array.
    static async buscarLivro(id: number) 
    {
        const [ rows ] = await pool.query<RowDataPacket[]>('SELECT * FROM livros WHERE id = ?', 
            [id]);
        
        return rows[0];
    }
    // O tipo de retorno do INSERT é um ResultSetHeader que tem as propriedades de affectedRows e mais.
    static async cadastrarLivro(livro: Livro): Promise<ResultSetHeader>
    {
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO livros (titulo, autor, ano_lancamento, valor_emprestimo, quantidade) VALUES (?, ?, ?, ?, ?)', 
            [livro.titulo, 
            livro.autor, 
            livro.ano_lancamento, 
            livro.valor_emprestimo, 
            livro.quantidade]);

        return result;
    }

    static async deletarLivro(id: number): Promise<ResultSetHeader>
    {
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM livros WHERE id = ?', [id]);

        return result;
    }

    static async editarLivro(id: number, newLivro: Livro): Promise<ResultSetHeader>
    {
        const [ result ] = await pool.query<ResultSetHeader>('UPDATE livros SET titulo = ?, autor = ?, ano_lancamento = ?, valor_emprestimo = ?, quantidade = ?, updated_at = NOW() WHERE id = ?', [newLivro.titulo, newLivro.autor, newLivro.ano_lancamento, newLivro.valor_emprestimo, newLivro.quantidade, id]);

        return result;
    }

    static async diminuirQuantidade(
        db: Pool | PoolConnection,
        id: number
    ): Promise<ResultSetHeader>
    {
        const [ result ] = await db.query<ResultSetHeader>('UPDATE livros SET quantidade = quantidade - 1 WHERE id = ? ', [id]);

        return result;
    }

    static async aumentarQuantidade(
        db: Pool | PoolConnection,
        id: number
    ): Promise<ResultSetHeader>
    {
        const [ result ] = await db.query<ResultSetHeader>('UPDATE livros SET quantidade = quantidade + 1 WHERE id = ?', [id]);

        return result;
    }

}