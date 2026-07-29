import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.email("Email inválido"),
    senha: z.string().min(6, "Mínimo de 6 caracteres"),
    telefone: z.string().min(10, "Telefone inválido"),
    tipo: z.enum(['cliente', 'bibliotecario'])
})

export const loginSchema = z.object({
    email: z.email("Email inválido"),
    senha: z.string().min(1, "Senha obrigatória")
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;