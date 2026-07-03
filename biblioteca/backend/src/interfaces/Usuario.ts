export interface Usuario {
    nome: string,
    email: string,
    senha_hash: string,
    telefone: string,
    tipo: "bibliotecario" | "cliente"
}