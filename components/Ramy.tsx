"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, ShieldCheck, FileWarning, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: "user" | "ramy";
    text: string;
}

export function Ramy() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "ramy",
            text: "Assalam Alaikum, Engineer. I am Ramy, your Senior Electrical Consultant at R2H.AI. I am ready to review your project against DEWA V2.0 and ADDC standards.",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            text: inputValue,
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");

        // INTERNAL LOGIC SIMULATION
        setTimeout(() => {
            let responseText = "Engineer, per standard practice, always check the ambient temperature first.";
            const inputLower = inputValue.toLowerCase();

            // 1. Logic Rule: Ambient Temp 50C default
            if (inputLower.includes("temp") || inputLower.includes("ambient")) {
                responseText = "Understood. Please note that unless specific on-site data is provided, R2H.AI strictly derives all ratings at 50°C Ambient Temperature as per DEWA regulations.";
            }
            // 2. Logic Rule: Voltage Drop limits
            else if (inputLower.includes("drop") || inputLower.includes("voltage")) {
                responseText = "Per DEWA Standards, ensure Voltage Drop does not exceed 4% for Sub-mains and 2.5% for Lighting final circuits. Have you verified the run length?";
            }
            // 3. Logic Rule: Short Circuit
            else if (inputLower.includes("fault") || inputLower.includes("short circuit")) {
                responseText = "For MDBs, we typically mandate a minimum withstand capacity (Icu) of 31.5kA or 40kA depending on the transformer proximity. Please verify your discrimination study.";
            }
            // 4. Logic Rule: Phase Colors
            else if (inputLower.includes("phase") || inputLower.includes("color")) {
                responseText = "Kindly ensure strict adherence to Red, Yellow, Blue (RYB) phase identification. Old color codes (Red-White-Blue) are non-compliant.";
            }
            else {
                responseText = "I have noted that. Proceeding with the assumption of 50°C ambient temperature. Is there a specific regulation clause you wish to verify?";
            }

            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "ramy",
                    text: responseText,
                }
            ]);
        }, 1500);
    };

    const handleQuickAction = (action: string) => {
        if (action === "compliance") {
            setMessages(prev => [...prev, { id: Date.now().toString(), role: "ramy", text: "Running R2H Authority Compliance Check... \n- Ambient: 50°C [OK]\n- Phases: RYB [OK]\n- VD: <2.5% [OK]\nSystem is technically compliant." }]);
        }
        if (action === "fault") {
            setMessages(prev => [...prev, { id: Date.now().toString(), role: "ramy", text: "Generating Fault Report... Minimum SC rating set to 40kA. Earth Leakage protection added where applicable per ADDC Clause 4.2." }]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4"
                    >
                        <Card className="w-[380px] h-[550px] flex flex-col glass-panel border-white/20">
                            <CardHeader className="border-b border-white/10 pb-4 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/30">
                                        <Sparkles className="w-5 h-5 text-[#E5E4E2]" />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#020305]"></div>
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg text-white">Ramy</CardTitle>
                                        <p className="text-xs text-[#C0C0C0] font-medium tracking-wide">Senior Consultant | R2H.AI</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </CardHeader>

                            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex w-full",
                                            msg.role === "user" ? "justify-end" : "justify-start"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                                                msg.role === "user"
                                                    ? "bg-white/10 text-white rounded-tr-none border border-white/20"
                                                    : "bg-black/40 text-gray-200 rounded-tl-none border border-white/10 shadow-sm"
                                            )}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </CardContent>

                            <div className="p-4 border-t border-white/10 space-y-3">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleQuickAction('compliance')}
                                        className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" /> Verify DEWA Specs
                                    </button>
                                    <button
                                        onClick={() => handleQuickAction('fault')}
                                        className="text-[10px] px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center gap-1">
                                        <FileWarning className="w-3 h-3" /> Check SC Rating
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        className="h-10 text-sm"
                                        placeholder="Consult Ramy..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    />
                                    <Button size="icon" className="h-10 w-10 px-0" onClick={handleSend}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    id="tour-ramy"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E5E4E2] to-[#C0C0C0] flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.4)] border border-white/50 hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] transition-all"
                >
                    <MessageSquare className="w-7 h-7 text-black" />
                </motion.button>
            )}
        </div>
    );
}
