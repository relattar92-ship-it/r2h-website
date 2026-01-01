import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Card({ className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-white/5 hover:border-white/20",
                className
            )}
            {...props}
        />
    );
}

export function CardHeader({ className, ...props }: CardProps) {
    return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={cn("text-xl font-bold text-white tracking-wide", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
    return <div className={cn("text-gray-300", className)} {...props} />;
}
