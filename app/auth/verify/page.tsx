"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, RefreshCw } from "lucide-react";
import { generateOTPEmail } from "@/lib/email-template";

function VerifyPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState("");
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // OTP is sent via the login API before redirecting here.


    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        const newOtp = [...otp];
        pastedData.split("").forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
    };

    const handleVerify = async () => {
        const code = otp.join("");
        if (code.length !== 6) {
            setError("Please enter all 6 digits");
            return;
        }

        setIsVerifying(true);
        setError("");

        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();

            if (data.success) {
                setIsVerified(true);
                localStorage.removeItem("r2h_pending_signup");

                setTimeout(() => {
                    router.push("/dashboard?tour=true");
                }, 1500);
            } else {
                setError(data.error || "Invalid Code");
                setIsVerifying(false);
            }
        } catch (error) {
            console.error("Verification error:", error);
            setError("Verification failed. Please try again.");
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;

        try {
            const response = await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });


            const data = await response.json();

            if (data.success) {
                setResendCooldown(60);
                setError("");
            } else {
                setError(data.error || "Failed to resend code");
            }
        } catch (error) {
            console.error("Resend error:", error);
            setError("Failed to resend code. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <Card className="w-full max-w-md border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.1)] relative z-10">
                <CardHeader className="text-center pb-2">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                        {isVerified ? (
                            <CheckCircle className="w-7 h-7 text-emerald-400" />
                        ) : (
                            <Shield className="w-7 h-7 text-[#E5E4E2]" />
                        )}
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {isVerified ? "Verified!" : "Verify Your Email"}
                    </CardTitle>
                    <p className="text-sm text-gray-400 mt-1">
                        {isVerified
                            ? "Redirecting to your workspace..."
                            : `Enter the 6-digit code sent to ${email || "your email"}`}
                    </p>
                </CardHeader>

                <CardContent className="pt-6">
                    {isVerified ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                                <CheckCircle className="w-8 h-8 text-emerald-400" />
                            </div>
                            <p className="text-gray-400">Welcome to R2H.AI</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {/* OTP Input */}
                            <div className="flex justify-center gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-12 h-14 text-center text-2xl font-mono bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C0C0C0]/50 transition-colors"
                                    />
                                ))}
                            </div>

                            {/* Verify Button */}
                            <Button
                                onClick={handleVerify}
                                className="w-full py-6 text-base"
                                disabled={isVerifying || otp.join("").length !== 6}
                            >
                                {isVerifying ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Verifying...
                                    </span>
                                ) : (
                                    "Verify & Access Workspace"
                                )}
                            </Button>

                            {/* Resend */}
                            <div className="text-center">
                                <button
                                    onClick={handleResend}
                                    disabled={resendCooldown > 0}
                                    className="text-sm text-gray-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                                >
                                    <RefreshCw className="w-3 h-3" />
                                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
                                </button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
        }>
            <VerifyPageContent />
        </Suspense>
    );
}
