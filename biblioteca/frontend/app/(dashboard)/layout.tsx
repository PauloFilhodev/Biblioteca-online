"use client";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { usuario } = useAuth();

    return (
            <div className="flex h-screen">
                <Sidebar tipo={usuario?.tipo} />

                <div className="flex flex-1 flex-col">
                    <Header />

                    <main className="flex-1 p-6 bg-backgroundcolor text-black">
                        {children}
                    </main>
                </div>
            </div>
    );
}