import { LoginUsuario } from "../interfaces/LoginUsuario";
import { AuthModel } from "../models/AuthModel";
import bcrypt from 'bcrypt';
import { jwtUtil } from "../utils/jwt";

export class AuthService {
    static async login(login: LoginUsuario)
    {
        const usuarioRetornado = await AuthModel.login(login.email);

        if (!usuarioRetornado) {
            return null;
        }

        const senhaValida = await bcrypt.compare(login.senha, usuarioRetornado.senha_hash);

        if (!senhaValida)
        {
            return null;
        }

        // Gerar token JWT
        const token = jwtUtil.gerarToken(
            { id: usuarioRetornado.id, email: usuarioRetornado.email, tipo: usuarioRetornado.tipo }
        )

        return token;
    }
}