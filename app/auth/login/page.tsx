"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldAlert } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // SECURITY: Clear any legacy mock sessions on entering login
    useState(() => {
        if (typeof window !== "undefined") {
            localStorage.clear();
            // Clear any old session cookies if possible (though HttpOnly prevents this, 
            // the logout API is better)
        }
    });


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                // Redirect to OTP verification
                router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
            } else {
                setError(data.error || "Invalid credentials");
                setIsLoading(false);
            }
        } catch (err) {
            setError("Connection to VIP Security failed");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <Card className="w-full max-w-md border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.1)] relative z-10">
                <CardHeader className="text-center pb-2">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <Lock className="w-7 h-7 text-[#E5E4E2]" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">VIP Access</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">R2H.AI Secure Terminal</p>
                </CardHeader>

                <CardContent className="pt-6">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                                <ShieldAlert className="w-5 h-5 shrink-0" />
                                <span className="font-semibold">{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Protocol: Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="email"
                                    placeholder="engineer@r2h.ai"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C0C0C0]/50 transition-all focus:bg-white/[0.08]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Protocol: Password</label>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C0C0C0]/50 transition-all focus:bg-white/[0.08]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-6 text-base font-bold tracking-wider relative overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            disabled={isLoading}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Secure Login <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </span>
                        </Button>

                        <div className="pt-4 text-center">
                            <p className="text-xs text-gray-500 font-medium">
                                Authorized Personnel Only. <br />
                                <span className="text-[#C0C0C0]">R2H.AI Platform Security v1.0.4</span>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

