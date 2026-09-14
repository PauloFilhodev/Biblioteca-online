"use client";

import { useRouter } from "next/navigation"; // Corrigido: no App Router usamos next/navigation
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { me } from "@/service/auth.service";
import Loading from "./ui/Loading";

interface Usuario {
    nome: string;
    email: string;
    tipo: 'cliente' | 'bibliotecario';
}

interface AuthContextType {
    usuario: Usuario | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) { // Providencia um contexto geral para acesso de informações necessárias em várias partes do código
    const [usuario, setUsuario] = useState<Usuario | null>(null); 
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function verifyUser() {
            try {
                const response = await me();
                const userData = response.data.usuario;

                setUsuario(userData);
            } catch (error) {
                setUsuario(null);
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        }

        verifyUser();
    }, [router]);

    return (
        <AuthContext.Provider value={{ usuario, loading }}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
}

// Hook que facilita o uso do useAuth, boa prática ao usar o useContext
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthContextProvider");
    }
    return context;
}