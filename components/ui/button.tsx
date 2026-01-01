import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "default" | "sm" | "lg" | "icon";
}

export function Button({ className, variant = "primary", size = "default", ...props }: ButtonProps) {
    const variants = {
        // Lightning Silver: Platinum background, black text, bright white/silver glow
        primary: "bg-[#E5E4E2] hover:bg-white text-black font-bold shadow-[0_0_20px_rgba(229,228,226,0.5)] hover:shadow-[0_0_35px_rgba(255,255,255,0.7)] border border-white/50",

        // Secondary: Silver-tinted glass
        secondary: "bg-white/5 hover:bg-white/10 text-[#E5E4E2] border border-white/20 hover:border-white/40",

        ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white",

        danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
    };

    const sizes = {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
        icon: "h-10 w-10 p-0 flex items-center justify-center"
    };

    return (
        <button
            className={cn(
                "rounded-xl font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
}
