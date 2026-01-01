"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CreditCard, Zap, Activity, Shield, BarChart3, Settings, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: Activity, label: "Live Dashboard", href: "/dashboard" },
    { icon: Zap, label: "Cable Logic", href: "/dashboard/cable-logic" },
    { icon: CreditCard, label: "Motor Wizard", href: "/dashboard/motor-wizard" },
    { icon: Shield, label: "Safety & Defense", href: "/dashboard/safety-defense" },
    { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; mobile: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.success) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error("Failed to fetch user in Sidebar");
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/");
        } catch (err) {
            console.error("Logout failed");
            router.push("/");
        }
    };

    return (
        <div className="w-64 h-screen fixed left-0 top-0 glass-panel border-r border-white/20 flex flex-col z-40">
            <div className="p-6 border-b border-white/10" id="tour-sidebar">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-white tracking-widest cursor-pointer hover:opacity-80 transition-opacity">
                        R2H<span className="text-[#C0C0C0]">.AI</span>
                    </h1>
                </Link>
                <div className="mt-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] flex flex-col gap-0.5">
                    <span>VIP Engineering</span>
                    {user && <span className="text-[#C0C0C0] font-bold">{user.name}</span>}
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={idx}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                                isActive
                                    ? "bg-white/10 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500 group-hover:text-white")} />
                            <span className="font-medium text-sm">{item.label}</span>
                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
                {/* User Status Card */}
                {user && (
                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-2">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white truncate w-32">{user.name}</span>
                                <span className="text-[10px] text-gray-400">{user.mobile}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_#34d399]"></span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-mono">System Verified</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-white/5 hover:text-red-300 transition-all border border-transparent hover:border-red-500/10"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
}
