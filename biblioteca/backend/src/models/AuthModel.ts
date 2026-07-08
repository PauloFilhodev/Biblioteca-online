import pool from "../config/database";
import { RowDataPacket } from "mysql2";

export class AuthModel {
    static async login(email: string): Promise<RowDataPacket>
    {
        const [ rows ] = await pool.query<RowDataPacket[]>('SELECT * FROM usuarios WHERE email = ?', [email]);

        return rows[0];
    }
}