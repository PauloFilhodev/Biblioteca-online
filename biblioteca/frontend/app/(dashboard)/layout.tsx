"use client";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import Loading from "@/components/ui/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { me } from "@/service/auth.service";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verificarUsuario() {
            try {
                await me();
                setLoading(false);
            } catch {
                router.replace('/login');
            }
        }

        verificarUsuario();
    }, [])

    if (loading)
    {
        return (<Loading />)
    }

    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Header />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}