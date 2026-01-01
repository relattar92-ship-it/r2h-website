"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Download, CheckCircle, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";

export function MainDashboard() {
    const loadData = [
        { name: 'Red Phase', value: 35 },
        { name: 'Yellow Phase', value: 32 },
        { name: 'Blue Phase', value: 33 },
    ];
    const COLORS = ['#ef4444', '#eab308', '#3b82f6'];

    return (
        <div className="space-y-8">
            {/* Header */}
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Project: <span className="text-[#C0C0C0]">EXPO-2030</span></h1>
                    <p className="text-gray-400">Authority: DEWA | Zone: Jebel Ali | Status: <span className="text-emerald-400">Active</span></p>
                </div>
                <Link href="/reports">
                    <Button className="border-0" id="tour-generate-btn">
                        <Download className="w-4 h-4 mr-2" /> Generate Authority Package
                    </Button>
                </Link>
            </header>

            <div className="grid grid-cols-12 gap-6">

                {/* Left Column: Metrics */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                        <MetricCard title="Connected Load" value="1.2 MW" subtitle="Active in Zone A" />
                        <MetricCard title="Diversity Factor" value="0.75" subtitle="Residential Standard" />
                        <MetricCard title="System Health" value="98%" subtitle="Optimization Level" />
                    </div>

                    <Card className="h-[400px]">
                        <CardHeader><CardTitle>Project Load Profile</CardTitle></CardHeader>
                        <CardContent className="h-full flex items-center justify-center text-gray-500">
                            {/* Placeholder for a Line Chart */}
                            Load Profile Chart Placeholder
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Key Status */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    {/* Phase Balancer (Retained for quick view) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Phase Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={loadData}
                                            innerRadius={40}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {loadData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#020305', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> R: 35%</div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Y: 32%</div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> B: 33%</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notification Feed */}
                    <Card>
                        <CardHeader><CardTitle>Latest Activity</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-3 items-start">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                    <Bell className="w-4 h-4 text-[#E5E4E2]" />
                                </div>
                                <div>
                                    <p className="text-sm text-white">Cable Schedule Exported</p>
                                    <p className="text-xs text-gray-500">2 mins ago by Ramy</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
                                    <Bell className="w-4 h-4 text-red-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-white">SC Warning in MDB-01</p>
                                    <p className="text-xs text-gray-500">10 mins ago • High Severity</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}

function MetricCard({ title, value, subtitle }: { title: string, value: string, subtitle: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{title}</p>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
    )
}
