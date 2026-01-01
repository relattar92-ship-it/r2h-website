import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ className, label, id, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-400 ml-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={cn(
                    "bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all",
                    className
                )}
                {...props}
            />
        </div>
    );
}
