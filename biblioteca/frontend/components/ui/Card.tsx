import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

export default function Card ({ children }: CardProps)
{
    return (
        <div className="h-full rounded-lg outline-2 outline-mist-900 text-purple-900 bg-purple-100 p-6 shadow flex flex-col gap-4">
            {children}
        </div>
    )
}