import { emitWarning } from "node:process";
import { CadastrarUsuario } from "../interfaces/CadastroUsuario";
import { Usuario } from "../interfaces/Usuario"
import { UsuarioModel } from "../models/UsuarioModel";
import bcrypt from "bcrypt";


export class UsuarioService {
    static async buscarUsuario(id: number)
    {
        const result = await UsuarioModel.buscarUsuario(id);

        return result;
    }

    static async cadastrarUsuario(usuario: CadastrarUsuario)
    {
        const senhaHash = await bcrypt.hash(usuario.senha, 10);

        const cadastro = {
            nome: usuario.nome,
            email: usuario.email,
            senha_hash: senhaHash,
            telefone: usuario.telefone,
            tipo: usuario.tipo
        }

        const result = await UsuarioModel.cadastrarUsuario(cadastro);
        return result;
    }

    static async deletarUsuario(id: number)
    {
        const result = await UsuarioModel.deletarUsuario(id);

        return result;
    }

    static async editarUsuario(usuario: CadastrarUsuario, id: number)
    {
        const senhaHash = await bcrypt.hash(usuario.senha, 10);

        const newUsuario: CadastrarUsuario = {
            nome: usuario.nome,
            email: usuario.email,
            senha: senhaHash,
            telefone: usuario.telefone,
            tipo: usuario.tipo
        }

        const result = await UsuarioModel.editarUsuario(newUsuario, id);

        return result;
    }
}