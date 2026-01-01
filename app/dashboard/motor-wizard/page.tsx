"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle, Info } from "lucide-react";
import { calculateMotorParams, MotorType } from "@/lib/logic";
import { cn } from "@/lib/utils";

export default function MotorWizardPage() {
    const [powerKW, setPowerKW] = useState<number>(55);
    const [distance, setDistance] = useState<number>(50);
    const [motorType, setMotorType] = useState<MotorType>('Star-Delta');
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const motor = calculateMotorParams(powerKW, motorType);
        setResults(motor);
    }, [powerKW, distance, motorType]);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-white mb-2">Motor <span className="text-[#C0C0C0]">Wizard</span></h1>
                <p className="text-gray-400">Advanced Starter Selection & Protection Coordination</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* THE ENGINE (Moved from Dashboard) */}
                <Card className="border-t-4 border-t-[#C0C0C0]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#E5E4E2]" /> Motor Parameters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <Input
                                label="Motor Power (kW)"
                                type="number"
                                value={powerKW}
                                onChange={(e) => setPowerKW(Number(e.target.value))}
                            />

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Starter Type</label>
                                <select
                                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50"
                                    value={motorType}
                                    onChange={(e) => setMotorType(e.target.value as MotorType)}
                                >
                                    <option value="DOL">Direct On Line</option>
                                    <option value="Star-Delta">Star-Delta</option>
                                    <option value="VFD">VFD / Soft Starter</option>
                                </select>
                            </div>
                        </div>

                        {results && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-xs text-gray-400 uppercase">I_Run</p>
                                    <p className="text-2xl font-bold text-white">{results.iRun.toFixed(1)} A</p>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl border border-white/20 shadow-inner">
                                    <p className="text-xs text-gray-300 uppercase">I_Start</p>
                                    <p className="text-2xl font-bold text-white">{results.iStart.toFixed(1)} A</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 col-span-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase">Breaker Setting</p>
                                            <p className="text-xl font-bold text-[#E5E4E2]">{results.protectionSetting.toFixed(0)} A <span className="text-sm font-normal text-gray-500">(Type C/D)</span></p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase">Cable</p>
                                            <p className="text-xl font-bold text-[#E5E4E2]">{results.suggestedCable} mm²</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* SELECTION GUIDE (New) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Starter Selection Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Option
                            title="Direct On Line (DOL)"
                            range="< 7.5 kW"
                            pros="Simple, Low Cost, Full Torque"
                            cons="High Inrush (6-8x)"
                            active={motorType === 'DOL'}
                        />
                        <Option
                            title="Star-Delta"
                            range="7.5 kW - 55 kW"
                            pros="Reduced Inrush (2-3x), Cost Effective"
                            cons="Low Starting Torque"
                            active={motorType === 'Star-Delta'}
                        />
                        <Option
                            title="VFD / Soft Starter"
                            range="> 55 kW"
                            pros="No Inrush, Speed Control, Gentle Ramp"
                            cons="Expensive, Harmonics"
                            active={motorType === 'VFD'}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function Option({ title, range, pros, cons, active }: { title: string, range: string, pros: string, cons: string, active: boolean }) {
    return (
        <div className={cn("p-4 rounded-xl border transition-all cursor-default",
            active ? "bg-white/10 border-white/40 shadow-lg" : "bg-white/5 border-white/5 opacity-60"
        )}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white text-lg">{title}</h4>
                {active && <CheckCircle className="w-5 h-5 text-emerald-400" />}
            </div>
            <div className="text-sm space-y-1">
                <p className="text-gray-400"><span className="text-gray-500 font-mono text-xs uppercase w-12 inline-block">Range</span> {range}</p>
                <p className="text-gray-400"><span className="text-gray-500 font-mono text-xs uppercase w-12 inline-block">Pros</span> <span className="text-emerald-400/80">{pros}</span></p>
                <p className="text-gray-400"><span className="text-gray-500 font-mono text-xs uppercase w-12 inline-block">Cons</span> <span className="text-red-400/80">{cons}</span></p>
            </div>
        </div>
    )
}
