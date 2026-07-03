import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService"
import { CadastrarUsuario } from "../interfaces/CadastroUsuario";
import { Usuario } from "../interfaces/Usuario";


export class UsuarioController {

    static async buscarUsuario(req: Request, res: Response) 
    {
        const usuarioId = Number(req.params.id);
        const usuarioRetornado = await UsuarioService.buscarUsuario(usuarioId);

        if (Number.isNaN(usuarioId)) 
        {
            res.status(400).json({
                message: "Id inválido"
            })
        }

        res.status(200).json(usuarioRetornado);
    }

    static async cadastrarUsuario(req: Request, res: Response)
    {
        const usuario: CadastrarUsuario = req.body;

        if (usuario.nome == null || usuario.email == null || usuario.senha == null || usuario.telefone == null || usuario.tipo == null) {
            return res.status(400).json({
                message: "Dados inválidos"
            })
        }

        const result = await UsuarioService.cadastrarUsuario(usuario);

        if (result.affectedRows === 0)
        {
            return res.status(500).json({
                message: "Erro ao cadastrar usuario"
            })
        }

        return res.status(201).json({
            message: "Usuario criado",
            id: result.insertId
        })
    }

    static async deletarUsuario(req: Request, res: Response)
    {
        const usuarioId = Number(req.params.id);

        if (Number.isNaN(usuarioId)) {
            return res.status(400).json({
                message: "Id inválido"
            })
        }

        const result = await UsuarioService.deletarUsuario(usuarioId);

        if (result.affectedRows === 0)
        {
            return res.status(500).json({
                message: "Erro ao deletar usuário"
            })
        }

        return res.status(200).json({
            message: "Usuario deletado com sucesso"
        });
    }

    static async editarUsuario(req: Request, res: Response)
    {
        const usuario: CadastrarUsuario = req.body;
        const usuarioId = Number(req.params.id);

        if (usuario.nome == null || usuario.email == null || usuario.senha == null || usuario.telefone == null || usuario.tipo == null) 
        {
            return res.status(400).json({
                message: "Dados inválidos"
            })
        }

        const result = await UsuarioService.editarUsuario(usuario, usuarioId);

        if (result.affectedRows === 0)
        {
            return res.status(500).json({
                message: "Erro ao editar usuário"
            })
        }

        return res.status(200).json({
            message: "Usuário editado com sucesso"
        })
    }
}