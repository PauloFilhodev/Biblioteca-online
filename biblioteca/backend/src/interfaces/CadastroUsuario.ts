export interface CadastrarUsuario {
    nome: string,
    email: string,
    senha: string,
    telefone: string,
    tipo: "bibliotecario" | "cliente"
}