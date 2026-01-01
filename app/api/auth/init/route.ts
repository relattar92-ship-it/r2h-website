import { NextRequest, NextResponse } from "next/server";
import { initDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await initDb();
        return NextResponse.json({
            success: true,
            message: "Database initialized successfully (users table verified).",
            env_status: {
                has_db: !!process.env.DATABASE_URL,
                has_resend: !!process.env.RESEND_API_KEY,
                has_jwt_secret: !!(process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET)
            }
        });
    } catch (error: any) {
        console.error("Manual DB Init Failure:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            tip: "Check your DATABASE_URL in Vercel settings."
        }, { status: 500 });
    }
}
