import { Request, Response, NextFunction } from "express";

export class UserTypeMiddleware 
{
    static async verifyUserRole (req: Request, res: Response, next: NextFunction)
    {
        if (req.usuario?.tipo !== 'bibliotecario')
        {
            return res.status(403).json({
                message: "Acesso não autorizado."
            })
        }

        next();
    }
}