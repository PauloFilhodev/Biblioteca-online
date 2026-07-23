import { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLElement> {}

export default function Input (props: InputProps) {
    return (
        <input 
        {...props}
        type="text" 
        className="bg-purple-100 w-full rounded-md px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 focus:ring-2 focus:ring-indigo-500" />
    );
}