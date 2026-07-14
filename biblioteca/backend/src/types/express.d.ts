import { AuthTokenPayload } from "../interfaces/AuthTokenPayload";

declare global {
    namespace Express {
        interface Request {
            usuario?: AuthTokenPayload;
        }
    }
}

export {};