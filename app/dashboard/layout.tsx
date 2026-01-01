"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TourGuide } from "@/components/TourGuide";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Dashboard is protected by server-side middleware.ts


    return (
        <div className="min-h-screen bg-[#020305]">
            <Sidebar />
            <div className="pl-64 transition-all duration-300">
                <div className="p-8">
                    <React.Suspense fallback={null}>
                        <TourGuide />
                    </React.Suspense>
                    {children}
                </div>
            </div>
        </div>
    );
}
