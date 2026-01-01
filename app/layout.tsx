import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Ramy } from "@/components/Ramy";
import { PublicHeader } from "@/components/PublicHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R2H.AI - VIP Engineering Platform",
  description: "Advanced Electrical Engineering Platform for UAE Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PublicHeader />
        <main className="min-h-screen relative">
          {children}
        </main>
        <Ramy />
      </body>
    </html>
  );
}
