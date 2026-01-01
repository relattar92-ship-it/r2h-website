"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Battery, Gauge } from "lucide-react";

export default function SafetyDefensePage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-white mb-2">Safety & <span className="text-[#C0C0C0]">Defense</span></h1>
                <p className="text-gray-400">Critical Systems Validation & Fault Analysis</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Short Circuit Logic */}
                <Card className="border-t-4 border-t-red-500/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-400" /> Short Circuit Defense
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-2 opacity-20"><Shield className="w-24 h-24" /></div>
                            <h4 className="text-gray-300 text-sm uppercase mb-2">Main Distribution Board (MDB)</h4>
                            <div className="text-4xl font-bold text-white mb-1">40.0 kA</div>
                            <div className="text-xs text-gray-500">Min. Withstand Rating (1s)</div>
                        </div>

                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-2 opacity-20"><Shield className="w-24 h-24" /></div>
                            <h4 className="text-gray-300 text-sm uppercase mb-2">Sub-Distribution (SMDB)</h4>
                            <div className="text-4xl font-bold text-white mb-1">25.0 kA</div>
                            <div className="text-xs text-gray-500">Min. Withstand Rating (1s)</div>
                        </div>
                    </CardContent>
                </Card>

                {/* Protocols */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#E5E4E2]" /> Active Protocols
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3">
                                <Battery className="w-6 h-6 text-emerald-400" />
                                <div>
                                    <p className="text-sm font-semibold text-white">Civil Defense Battery Check</p>
                                    <p className="text-xs text-gray-400">Central Battery System Duration</p>
                                </div>
                            </div>
                            <span className="text-emerald-400 font-mono font-bold">PASS 3h+</span>
                        </div>

                        <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3">
                                <Gauge className="w-6 h-6 text-indigo-400" />
                                <div>
                                    <p className="text-sm font-semibold text-white">Adiabatic Thermal Check</p>
                                    <p className="text-xs text-gray-400">Earth Conductor Size (k²S² &gt; I²t)</p>
                                </div>
                            </div>
                            <span className="text-emerald-400 font-mono font-bold">VALIDATED</span>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
