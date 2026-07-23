import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="bg-purple-700 rounded-md py-2 focus:bg-purple-800 w-full hover:bg-purple-900 hover: cursor-pointer text-white"
        >
            {children}
        </button>
    );
}