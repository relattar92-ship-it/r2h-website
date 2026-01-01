"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navLinks = [
    { label: "Technology", href: "/#technology" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/#contact" },
];

export function PublicHeader() {
    const pathname = usePathname();

    // Don't render on dashboard routes
    if (pathname?.startsWith("/dashboard")) {
        return null;
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1">
                    <span className="text-xl font-bold text-white tracking-widest">R2H</span>
                    <span className="text-xl font-bold text-[#C0C0C0]">.AI</span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <Link href="/auth">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full px-6 border border-white/20 bg-white/10 hover:bg-white/20 text-white"
                    >
                        Log In
                    </Button>
                </Link>
            </nav>
        </header>
    );
}
