"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for real logic
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <Card className="w-full max-w-md border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.1)] relative z-10">
                <CardHeader className="text-center pb-2">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <KeyRound className="w-7 h-7 text-[#E5E4E2]" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Recover Access</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Enter your email to receive a reset link</p>
                </CardHeader>

                <CardContent className="pt-6">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Account Email</label>
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

                            <Button type="submit" className="w-full py-6 text-base font-bold tracking-wider">
                                Send Recovery Link
                            </Button>

                            <Link href="/auth/login" className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back to Login
                            </Link>
                        </form>
                    ) : (
                        <div className="text-center py-6 space-y-4">
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                                If an account exists for <b>{email}</b>, a reset link has been sent.
                            </div>
                            <Link href="/auth/login" className="w-full">
                                <Button variant="ghost" className="w-full border border-white/10 hover:bg-white/5">
                                    Return to Login
                                </Button>
                            </Link>

                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
