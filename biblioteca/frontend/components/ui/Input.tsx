"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    showToggle?: boolean;
}

export default function Input({ showToggle, type, ...props }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        showToggle && type === "password"
            ? showPassword
                ? "text"
                : "password"
            : type;


    return (
        <div className="relative">
            <input
                {...props}
                type={inputType}
                className="w-full rounded-md border px-3 py-2 pr-10"
            />

            {showToggle && type === "password" && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover: cursor-pointer"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            )}
        </div>
    );
}