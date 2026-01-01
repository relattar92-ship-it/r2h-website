"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, Activity, Search } from "lucide-react";
import { calculateRequiredAmpacity, suggestCableSize } from "@/lib/logic";

export default function CableLogicPage() {
    const [load, setLoad] = useState(55); // kW
    const [distance, setDistance] = useState(50); // m
    const [temp, setTemp] = useState(50); // C

    // P = sqrt(3) VI PF -> I = P / (sqrt(3) * V * PF)
    const i_load = (load * 1000) / (Math.sqrt(3) * 400 * 0.85);
    const i_required = calculateRequiredAmpacity(i_load);
    const cableSize = suggestCableSize(i_required);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-white mb-2">Cable Logic <span className="text-[#C0C0C0]">Center</span></h1>
                <p className="text-gray-400">IEC 60364 Sizing Engine | DEWA V2.0 Compliance Mode</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calculator */}
                <Card className="lg:col-span-1 border-t-4 border-t-[#C0C0C0]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#E5E4E2]" /> Quick Sizing
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="Connected Load (kW)" type="number" value={load} onChange={e => setLoad(Number(e.target.value))} />
                        <Input label="Run Length (m)" type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} />
                        <Input label="Ambient Temp (°C)" type="number" value={temp} onChange={e => setTemp(Number(e.target.value))} />

                        <div className="pt-4 space-y-3">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Suggested Size</p>
                                <p className="text-2xl font-mono font-bold text-white">{cableSize} mm²</p>
                                <p className="text-xs text-gray-500 mt-1">Cu/XLPE/SWA/PVC</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Table */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Detailed Cable Schedule</CardTitle>
                        <div className="flex gap-2">
                            <Input placeholder="Search tag..." className="h-9 w-40 bg-black/40" />
                            <Button variant="secondary" size="sm">Export CSV</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-400">
                                <thead className="text-xs text-[#E5E4E2] uppercase bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-3">Cable Tag</th>
                                        <th className="px-6 py-3">From</th>
                                        <th className="px-6 py-3">To</th>
                                        <th className="px-6 py-3">Load (kW)</th>
                                        <th className="px-6 py-3">Size (mm²)</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { tag: "C-MDB-01", from: "LV Panel", to: "MDB-G-01", kw: 150, size: "4C x 70", status: "Approved" },
                                        { tag: "C-SMDB-02", from: "MDB-G-01", to: "SMDB-AC-01", kw: 85, size: "4C x 35", status: "Approved" },
                                        { tag: "C-MCC-01", from: "MDB-G-01", to: "MCC-Pump", kw: 45, size: "4C x 16", status: "Pending" },
                                        { tag: "C-DB-L-01", from: "SMDB-G", to: "DB-Lighting", kw: 12, size: "4C x 6", status: "Approved" },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">{row.tag}</td>
                                            <td className="px-6 py-4">{row.from}</td>
                                            <td className="px-6 py-4">{row.to}</td>
                                            <td className="px-6 py-4 text-white">{row.kw}</td>
                                            <td className="px-6 py-4 font-mono text-[#C0C0C0]">{row.size}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] border ${row.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
