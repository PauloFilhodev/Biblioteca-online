import { api } from "@/lib/api";
import { LoginData, RegisterData } from "@/schemas/auth.schema";

export async function login(data: LoginData) {
    return api.post('/auth', data);
}

export async function registerUser(data: RegisterData) {
    return api.post('/usuarios', data);
}