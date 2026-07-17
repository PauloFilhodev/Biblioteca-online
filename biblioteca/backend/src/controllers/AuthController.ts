import { Request, Response } from "express";
import { LoginUsuario } from "../interfaces/LoginUsuario";
import { AuthService } from "../services/AuthService";
// Pega o email e senha que a request possui no body para o service verificar se está correto com o bcrypt.compare
export class AuthController {
    static async login(req: Request, res: Response)
    {
        const login: LoginUsuario = req.body;

        if (login.email == null || login.senha == null) {
            return res.status(400).json({
                message: "Dados inválidos"
            })
        }

        const token = await AuthService.login(login);

        if (token == null)
        {
            return res.status(401).json({
                message: "E-mail ou senha inválidos."
            })
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true quando usar HTTPS em produção
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 // 1 dia
        });

        return res.status(200).json({
            message: "Login realizado com sucesso."
        });
    }

    static async logout(req: Request, res: Response)
    {
        res.clearCookie("token");

        return res.status(200).send();
    }
}