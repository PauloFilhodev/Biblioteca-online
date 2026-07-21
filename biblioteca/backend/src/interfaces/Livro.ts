import { RowDataPacket } from "mysql2";

export interface Livro extends RowDataPacket {
    titulo: string,
    autor: string,
    ano_lancamento: number,
    valor_emprestimo: number,
    quantidade: number;
}