"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, Check, CreditCard, Zap, Shield, Crown, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Plan = "associate" | "senior" | "authority";

const plans = [
    {
        id: "associate" as Plan,
        name: "Associate",
        price: 0,
        icon: Zap,
        features: ["Basic Motor Wizard", "Lighting Voltage Drop", "Online Access Only"],
    },
    {
        id: "senior" as Plan,
        name: "Senior Engineer",
        price: 49,
        icon: Shield,
        features: ["Full Cable Sizing Engine", "Sub-main Voltage Drop", "Fault Level Reports", "Basic AI Consultant"],
        popular: true,
    },
    {
        id: "authority" as Plan,
        name: "Authority",
        price: 199,
        icon: Crown,
        features: ["Unlimited Projects", "Advanced AI Consultant", "Direct Authority Export", "Offline Windows App"],
    },
];

const countryCodes = [
    { code: "+971", label: "🇦🇪 UAE" },
    { code: "+966", label: "🇸🇦 KSA" },
    { code: "+968", label: "🇴🇲 OMN" },
    { code: "+974", label: "🇶🇦 QAT" },
    { code: "+973", label: "🇧🇭 BAH" },
    { code: "+965", label: "🇰🇼 KWT" },
    { code: "+20", label: "🇪🇬 EGY" },
    { code: "+44", label: "🇬🇧 UK" },
    { code: "+1", label: "🇺🇸 USA" },
];

function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const planFromUrl = searchParams.get("plan") as Plan;

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState("+971");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        mobileNumber: "",
        email: "",
        password: "",
        plan: planFromUrl && plans.find(p => p.id === planFromUrl) ? planFromUrl : ("senior" as Plan),
    });

    useEffect(() => {
        if (planFromUrl && plans.find(p => p.id === planFromUrl)) {
            setFormData(prev => ({ ...prev, plan: planFromUrl }));
        }
    }, [planFromUrl]);

    const updateForm = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleFinalStep = async () => {
        setIsLoading(true);
        setError("");

        // Send real signup data to API
        try {
            const combinedMobile = `${selectedCountryCode}${formData.mobileNumber}`;
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    password: formData.password,
                    mobile: combinedMobile,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to OTP verification
                router.push("/auth/verify?email=" + encodeURIComponent(formData.email));
            } else {
                setError(data.error || "An unknown error occurred.");
                setIsLoading(false);
            }
        } catch (error) {
            setError("Failed to connect to the server. Please try again.");
            setIsLoading(false);
        }
    };


    const selectedPlan = plans.find(p => p.id === formData.plan) || plans[1];

    return (
        <Card className="w-full max-w-lg border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.1)] relative z-10 transition-all duration-500">
            <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                    <User className="w-7 h-7 text-[#E5E4E2]" />
                </div>
                <CardTitle className="text-2xl font-bold">Create VIP Account</CardTitle>
                <p className="text-sm text-gray-400 mt-1">Tier: <span className="text-white font-semibold">{selectedPlan.name}</span></p>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    {[1, 2].map((s) => (
                        <div
                            key={s}
                            className={cn(
                                "w-12 h-1 rounded-full transition-colors",
                                step >= s ? "bg-[#C0C0C0]" : "bg-white/10"
                            )}
                        />
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest">
                    Step {step} of 2: {step === 1 ? "Engineering Details" : "Account Confirmation"}
                </p>
            </CardHeader>

            <CardContent className="pt-6">
                {/* Step 1: Personal Details */}
                {step === 1 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Ahmed Al Rashid"
                                    value={formData.name}
                                    onChange={(e) => updateForm("name", e.target.value)}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C0C0C0]/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Mobile Number (Global)</label>
                            <div className="flex gap-2">
                                <div className="relative w-32 shrink-0">
                                    <select
                                        value={selectedCountryCode}
                                        onChange={(e) => setSelectedCountryCode(e.target.value)}
                                        className="w-full h-[46px] bg-white/5 border border-white/10 rounded-xl text-white appearance-none px-4 focus:outline-none focus:border-[#C0C0C0]/50 transition-colors cursor-pointer"
                                    >
                                        {countryCodes.map(c => (
                                            <option key={c.code} value={c.code} className="bg-[#030509]">
                                                {c.label} ({c.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative flex-1">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="tel"
                                        placeholder="50 123 4567"
                                        value={formData.mobileNumber}
                                        onChange={(e) => updateForm("mobileNumber", e.target.value)}
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C0C0C0]/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Professional Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="engineer@company.ae"
                                    value={formData.email}
                                    onChange={(e) => updateForm("email", e.target.value)}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C0C0C0]/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 8 characters"
                                    value={formData.password}
                                    onChange={(e) => updateForm("password", e.target.value)}
                                    required
                                    minLength={8}
                                    className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C0C0C0]/50 transition-colors"
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
                            onClick={handleNext}
                            className="w-full py-6 text-base mt-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                            disabled={!formData.name || !formData.mobileNumber || !formData.email || formData.password.length < 8}
                        >
                            Next <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                    </div>
                )}

                {/* Step 2: Summary / Payment */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                                <ShieldAlert className="w-5 h-5 shrink-0" />
                                <span className="font-semibold">{error}</span>
                            </div>
                        )}
                        {/* Order Summary */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">Plan Summary</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Selected Tier</span>
                                    <div className="flex items-center gap-2">
                                        <selectedPlan.icon className="w-4 h-4 text-[#C0C0C0]" />
                                        <span className="text-white font-semibold">{selectedPlan.name}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Account Owner</span>
                                    <span className="text-white">{formData.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Verified Email</span>
                                    <span className="text-white text-xs">{formData.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Recovery Mobile</span>
                                    <span className="text-white text-xs">{selectedCountryCode} {formData.mobileNumber}</span>
                                </div>

                                <div className="pt-4 border-t border-white/10 flex justify-between items-baseline font-bold">
                                    <span className="text-gray-300">Total Due</span>
                                    <div className="text-right">
                                        <span className="text-2xl text-[#E5E4E2]">${selectedPlan.price}</span>
                                        {selectedPlan.price > 0 && <span className="text-xs text-gray-500 ml-1">/mo</span>}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Payment Context or Confirm Info */}
                        {selectedPlan.price > 0 ? (
                            <div className="p-4 rounded-xl bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <CreditCard className="w-5 h-5 text-[#E5E4E2]" />
                                    <span className="text-sm font-semibold text-white">Secure Checkout</span>
                                </div>
                                <p className="text-xs text-gray-400">
                                    VIP systems require a valid payment method. You will be redirected to the secure portal.
                                </p>
                            </div>
                        ) : (
                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
                                <p className="text-xs text-emerald-400">
                                    No payment required for the Associate Tier. Click below to initialize your free workspace.
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 mt-8">
                            <Button
                                variant="secondary"
                                onClick={handleBack}
                                className="flex-1 py-6 border border-white/10"
                                disabled={isLoading}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Button>
                            <Button
                                onClick={handleFinalStep}
                                className="flex-[2] py-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        {selectedPlan.price > 0 ? "Processing..." : "Initializing..."}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        {selectedPlan.price > 0 ? (
                                            <>
                                                <CreditCard className="w-4 h-4" /> Pay & Continue
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-4 h-4" /> Create Account
                                            </>
                                        )}
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Accessing an existing workspace?{" "}
                        <Link href="/auth/login" className="text-[#C0C0C0] hover:text-white transition-colors font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[180px] pointer-events-none" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C0C0C0]/5 rounded-full blur-[120px] pointer-events-none" />

            <Suspense fallback={
                <div className="flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white/10 border-t-[#C0C0C0] rounded-full animate-spin"></div>
                </div>
            }>
                <SignupForm />
            </Suspense>
        </div>
    );
}
