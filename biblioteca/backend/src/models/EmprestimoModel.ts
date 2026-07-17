import { ResultSetHeader, RowDataPacket, Pool, PoolConnection } from "mysql2/promise";
import pool from "../config/database"
import { EstadoEmprestimo } from "../services/EmprestimoService";
import { CadastroEmprestimo } from "../interfaces/CadastroEmprestimo";
import { resourceUsage } from "node:process";

export class EmprestimoModel {
    
    static async listarEmprestimos(param: EstadoEmprestimo | null): Promise<RowDataPacket[]>
    {
        if (param == null)
        {
            const [ rows ] = await pool.query<RowDataPacket[]>('SELECT * FROM emprestimos');

            return rows;
        }

        const [ rows ] = await pool.query<RowDataPacket[]>('SELECT * FROM emprestimos WHERE status = ?', [param]);

        return rows;
    }

    static async listarEmprestimo(id: number): Promise<RowDataPacket>
    {
        const [ rows ] = await pool.query<RowDataPacket[]>('SELECT * FROM emprestimos WHERE id = ?', [id]);

        return rows[0];
    }

    static async buscarEmprestimoAtivo(
        db: Pool | PoolConnection,
        usuario_id: number, 
        livro_id: number
    ): Promise<RowDataPacket>
    {
        const [ rows ] = await db.query<RowDataPacket[]>('SELECT * FROM emprestimos WHERE usuario_id = ? AND livro_id = ? AND status = ?', [usuario_id, livro_id, "alugado"]);

        return rows[0];
    }

    static async cadastrarEmprestimo(
        db: Pool | PoolConnection,
        emprestimo: CadastroEmprestimo
    ): Promise<ResultSetHeader>
    {
        const [ result ] = await db.query<ResultSetHeader>('INSERT INTO emprestimos (usuario_id, livro_id, valor_pago, data_emprestimo, data_prevista, status) VALUES (?,?,?,?,?, ?)', [emprestimo.usuario_id, emprestimo.livro_id, emprestimo.valor_pago, emprestimo.data_emprestimo, emprestimo.data_prevista, "alugado"]);

        return result;
    }

    static async devolverLivro(
        db: Pool | PoolConnection,
        id: number
    ): Promise<ResultSetHeader>
    {
        const [ result ] = await db.query<ResultSetHeader>('UPDATE emprestimos SET status = ?, data_devolucao = NOW() WHERE id = ?', ["devolvido", id]);

        return result;
    }

    static async emprestimosUsuario(id: number): Promise<RowDataPacket[]>
    {
        const [ result ] = await pool.query<RowDataPacket[]>('SELECT * FROM emprestimos WHERE usuario_id = ?', [id]);

        return result;
    }

    static async emprestimosLivro(id: number): Promise<RowDataPacket[]>
    {
        const [ result ] = await pool.query<RowDataPacket[]>('SELECT * FROM emprestimos WHERE livro_id = ?', [id]);
        return result;
    }

}