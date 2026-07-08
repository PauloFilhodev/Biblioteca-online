import jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '../interfaces/AuthTokenPayload';
import 'dotenv';

export class jwtUtil {
    static async gerarToken(usuario: AuthTokenPayload) {
        const token = jwt.sign(
            { userId: usuario.id, email: usuario.email, tipo: usuario.tipo },
            process.env.JWT_SECRET as string || 'default_secret',
            { expiresIn: '1h' }
        )

        return token;
    }
    // Precisa retornar uma promise do tipo JwtPayload ou null
    static async verificarToken(token: string): Promise<AuthTokenPayload | null>
    {
        try {
            const tokenVerificada = await jwt.verify(token, process.env.JWT_SECRET as string || 'default_secret'); // Isso retorna o payload do jwt.sign()
            
            return tokenVerificada as AuthTokenPayload; // Retorna o payload do token, que é do tipo JwtPayload
        } catch (error)
        {
            return null;
        }
    }
}