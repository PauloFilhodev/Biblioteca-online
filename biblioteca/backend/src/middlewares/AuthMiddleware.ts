import { NextFunction, Response, Request } from "express";
import { jwtUtil } from "../utils/jwt";
// Middleware que protege as rotas verificando se o navegador do usuário possui o token de login, e guarda o payload do token em req.usuario
export class AuthMiddleware {
    static async autenticar (req: Request, res: Response, next: NextFunction)
    {
        const token = req.cookies.token;

        if (token == null)
        {
            return res.status(401).json({
                message: "Acesso não autorizado"
            })
        }

        const payload = await jwtUtil.verificarToken(token);

        if (!payload)
        {
            return res.status(401).json({
                message: "Token inválido."
            });
        }

        req.usuario = payload;

        next()
    }
}