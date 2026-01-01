"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Zap } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export function TourGuide() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (searchParams.get("tour") === "true") {
            setIsVisible(true);
        }
    }, [searchParams]);

    const steps = [
        {
            targetId: "tour-sidebar",
            title: "Expert Modules",
            desc: "Access specialized UAE engineering modules here. From Cable Scaling to Motor Analysis.",
            position: "left-20 top-20" // Fallback / relative
        },
        {
            targetId: "tour-ramy",
            title: "Senior Consultant Ramy",
            desc: "Meet Ramy, your Senior Electrical Advisor. Ask him anything about regulations or calculations.",
            position: "bottom-20 right-20"
        },
        {
            targetId: "tour-generate-btn",
            title: "Authority Package",
            desc: "One-click generation for DEWA/ADDC submittals. Automatically compiles your calculations.",
            position: "top-20 right-20"
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        router.replace("/dashboard"); // Remove query param
    };

    if (!isVisible) return null;

    const currentStep = steps[step];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
                {/* Backdrop Area - Dim everything except target? 
                    For MVP, we just show a focused Modal in center or relative position.
                    To make it truly contextual, we would need getBoundingClientRect.
                    For now, we'll use a fixed positioning strategy based on the typical layout 
                    since layout is fixed.
                */}

                {/* 1. Sidebar Highlight Position: Fixed Left */}
                {step === 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        className="absolute left-[280px] top-[100px] pointer-events-auto"
                    >
                        <TourCard step={currentStep} current={step + 1} total={steps.length} onNext={handleNext} onClose={handleClose} />
                    </motion.div>
                )}

                {/* 2. Ramy Highlight Position: Bottom Right */}
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="absolute bottom-[100px] right-[400px] pointer-events-auto"
                    >
                        <TourCard step={currentStep} current={step + 1} total={steps.length} onNext={handleNext} onClose={handleClose} />
                    </motion.div>
                )}

                {/* 3. Generate Button Highlight Position: Top Right */}
                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute top-[80px] right-[250px] pointer-events-auto"
                    >
                        <TourCard step={currentStep} current={step + 1} total={steps.length} onNext={handleNext} onClose={handleClose} />
                    </motion.div>
                )}

            </div>
        </AnimatePresence>
    );
}

function TourCard({ step, current, total, onNext, onClose }: any) {
    return (
        <div className="w-80 glass-panel rounded-2xl p-6 border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)] relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-4 text-[#E5E4E2]">
                <Zap className="w-5 h-5 fill-white/50" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                {step.desc}
            </p>
            <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500">{current} / {total}</span>
                <Button size="sm" onClick={onNext} className="gap-2">
                    {current === total ? "Finish Tour" : "Next Step"} <ArrowRight className="w-3 h-3" />
                </Button>
            </div>

            {/* Pointer Arrow Decoration (Simplified) */}
            <div className="absolute -left-2 top-8 w-4 h-4 bg-white/10 rotate-45 border-l border-b border-white/20 backdrop-blur-md" />
        </div>
    )
}
