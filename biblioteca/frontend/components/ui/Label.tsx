import { ReactNode } from "react";

interface LabelProps {
    children: ReactNode;
    htmlFor?: string;
}

export default function Label ({children, htmlFor }: LabelProps)
{
    return (
        <label htmlFor={htmlFor} className="text-2xl text-black">
            {children}
        </label>
    )
}