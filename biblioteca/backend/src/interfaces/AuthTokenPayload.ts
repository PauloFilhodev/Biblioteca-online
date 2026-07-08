export interface AuthTokenPayload {
    id: number,
    email: string,
    tipo: "cliente" | "bibliotecario"
}