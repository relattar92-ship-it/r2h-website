"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { Sparkles, ShieldCheck, Zap, Cpu, Database, Network, Lock, FileCheck, Globe, Server, Download, ArrowRight, Bot, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen relative z-10 w-full overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none -z-10" />

            {/* 1. HERO SECTION */}
            <section className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 pt-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/20 text-[#E5E4E2] text-xs font-semibold tracking-wider uppercase mb-6 animate-fade-in-up backdrop-blur-md">
                    <Sparkles className="w-3 h-3" /> R2H.AI Intelligence V1.0
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
                    High-Fidelity <br />
                    <span className="bg-gradient-to-br from-white via-[#C0C0C0] to-gray-500 bg-clip-text text-transparent">
                        Electrical Intelligence
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
                    Autonomous design, validation, and optimization of critical power systems.
                    Precision engineered for the future of infrastructure.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link href="/auth/signup">
                        <Button size="lg" className="rounded-full px-10 py-6 text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                            Initialize Workspace
                        </Button>
                    </Link>


                    <Link href="/windows-app.zip">
                        <Button variant="secondary" size="lg" className="rounded-full px-8 py-6 text-lg flex items-center gap-2">
                            <Download className="w-5 h-5" /> Download Windows App
                        </Button>
                    </Link>
                </div>
            </section>

            {/* 2. TECHNOLOGY SECTION */}
            <section id="technology" className="py-24 px-4 max-w-7xl mx-auto w-full scroll-mt-24">
                <div className="text-left mb-12">
                    <h2 className="text-sm font-mono text-[#C0C0C0] uppercase tracking-widest mb-2">Core Technology</h2>
                    <h3 className="text-4xl font-bold text-white">The Engineering Engine</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <TechCard
                        icon={<Settings className="w-6 h-6 text-[#E5E4E2]" />}
                        title="Standards Engine"
                        desc="Real-time validation against IEC 60364, DEWA Regulations, and ADDC Wiring Rules."
                    />
                    <TechCard
                        icon={<Cpu className="w-6 h-6 text-[#C0C0C0]" />}
                        title="Precision Logic"
                        desc="Automated cable sizing, voltage drop analysis, and short-circuit calculations with 99.9% accuracy."
                    />
                    <TechCard
                        icon={<Bot className="w-6 h-6 text-white" />}
                        title="AI Consultant (Ramy)"
                        desc="An LLM-integrated advisor trained on 20+ years of UAE electrical authority standards."
                    />
                    <TechCard
                        icon={<FileCheck className="w-6 h-6 text-emerald-400" />}
                        title="Export Protocol"
                        desc="Direct-to-PDF generation for Authority Approval packages."
                    />
                </div>

                {/* Secondary Technology Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <TechCard
                        icon={<ShieldCheck className="w-6 h-6 text-[#E5E4E2]" />}
                        title="Standardization"
                        desc="Our engine is hard-coded with IEC 60364 and DEWA 2024 Regulations to ensure 100% compliance during authority submittals."
                    />
                    <TechCard
                        icon={<Zap className="w-6 h-6 text-[#C0C0C0]" />}
                        title="Optimization"
                        desc="Automated phase balancing and cable sizing algorithms reduce material costs by up to 15%."
                    />
                    <TechCard
                        icon={<Lock className="w-6 h-6 text-white" />}
                        title="Security"
                        desc="All calculations are processed in a secure VIP environment with end-to-end encryption."
                    />
                </div>
            </section>

            {/* 3. LOGIC PROCESSOR */}
            <section className="py-24 px-4 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-white">Logic Processor</h2>
                        <div className="space-y-6">
                            <LogicItem title="Formal Logic Validation" desc="Every calculation is mathematically proven and traceability linked to specific standards clauses." />
                            <LogicItem title="Multivariate Core" desc="Simultaneous processing of voltage drop, thermal stress, and earth loop impedance." />
                            <LogicItem title="Adaptive Compliance" desc="The engine updates its rule-set automatically as regional regulations evolve." />
                        </div>
                    </div>

                    <div className="relative h-[400px] w-full glass-panel rounded-3xl border-white/10 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-black to-gray-900 opacity-90" />
                        <div className="relative z-10 grid grid-cols-2 gap-4 p-8">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="text-xs text-gray-500 font-mono mb-1">INPUT STREAM</div>
                                <div className="text-2xl font-mono text-white">55.0 kW</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="text-xs text-gray-500 font-mono mb-1">LOGIC GATE</div>
                                <div className="text-2xl font-mono text-emerald-400">PASSED</div>
                            </div>
                            <div className="col-span-2 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                                <div className="text-xs text-gray-400 font-mono mb-1">OUTPUT VECTOR</div>
                                <div className="text-xl font-mono text-[#E5E4E2] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    OPTIMIZED_V2.0
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TRUST PROTOCOL */}
            <section className="py-24 px-4 max-w-7xl mx-auto text-center w-full">
                <h2 className="text-4xl font-bold text-white mb-16">The Trust Protocol</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <TrustItem icon={<FileCheck />} title="Formal Proof" />
                    <TrustItem icon={<Database />} title="Full Auditability" />
                    <TrustItem icon={<Globe />} title="Regional Intelligence" />
                    <TrustItem icon={<Server />} title="Enterprise Vault" />
                </div>
            </section>

            {/* 5. CONTACT SECTION */}
            <section id="contact" className="py-24 px-4 border-y border-white/5 bg-gradient-to-b from-transparent to-black/30 scroll-mt-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-sm font-mono text-[#C0C0C0] uppercase tracking-widest mb-4">Get Started</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Workflow?</h3>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Contact our sales team for a personalized demo and custom pricing for your organization.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-12 py-6 text-lg"
                        onClick={() => setIsContactOpen(true)}
                    >
                        Contact Sales
                    </Button>
                </div>
            </section>

            {/* 6. FOOTER */}
            <footer className="py-12 px-8 border-t border-white/10 bg-[#010101]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-left">
                        <h4 className="text-2xl font-bold text-white tracking-widest mb-1">R2H<span className="text-[#888]">.AI</span></h4>
                    </div>

                    <div className="text-right text-xs text-gray-600">
                        <p>contact@r2hai.com</p>
                        <p className="mt-1">© 2025 R2H AI ENGINEERING</p>
                    </div>
                </div>
            </footer>

            {/* Contact Modal */}
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

        </div>
    );
}

function TechCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-8 rounded-3xl glass-panel border border-[#C0C0C0]/20 hover:border-[#C0C0C0]/50 transition-all duration-500 hover:-translate-y-2 group">
            <div className="mb-6 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#E5E4E2] transition-colors">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
        </div>
    )
}

function LogicItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <div className="w-1 h-full min-h-[60px] bg-gradient-to-b from-white/50 to-transparent rounded-full" />
            <div>
                <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
                <p className="text-sm text-gray-400">{desc}</p>
            </div>
        </div>
    )
}

function TrustItem({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-colors">
            <div className="text-[#C0C0C0] w-8 h-8 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
            <span className="font-semibold text-gray-300 tracking-wide">{title}</span>
        </div>
    )
}
