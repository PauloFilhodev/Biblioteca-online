import { Usuario } from "../interfaces/Usuario";
import pool from "../config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CadastrarUsuario } from "../interfaces/CadastroUsuario";

export class UsuarioModel {

    static async buscarUsuario(id: number): Promise<RowDataPacket>
    {
        const [ rows ] = await pool.query<RowDataPacket[]>('SELECT * FROM usuarios WHERE id = ?', [id]);

        return rows[0];
    }

    static async cadastrarUsuario(usuario: Usuario): Promise<ResultSetHeader>
    {
        const [ result ] = await pool.query<ResultSetHeader>('INSERT INTO usuarios (nome, email, senha_hash, telefone, tipo) VALUES (?, ?, ?, ?, ?)', [usuario.nome, usuario.email, usuario.senha_hash, usuario.telefone, usuario.tipo]);

        return result;
    }

    static async deletarUsuario(id: number): Promise<ResultSetHeader>
    {
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM usuarios WHERE id = ?', [id]);

        return result;
    }

    static async editarUsuario(usuario: CadastrarUsuario, id: number): Promise<ResultSetHeader>
    {
        const [ result ] = await pool.query<ResultSetHeader>('UPDATE usuarios SET nome = ?, email = ?, senha_hash = ?, telefone = ?, tipo = ? WHERE id = ?', [usuario.nome, usuario.email, usuario.senha, usuario.telefone, usuario.tipo, id]);

        return result;
    }
}