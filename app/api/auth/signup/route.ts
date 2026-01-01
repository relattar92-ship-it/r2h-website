import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail, initDb } from "@/lib/db";
import { generateOTP, storeOTP } from "@/lib/otp-store";
import { Resend } from "resend";
import { generateOTPEmail } from "@/lib/email-template";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const { name, mobile, email, password } = await request.json();

        if (!name || !email || !password || !mobile) {
            return NextResponse.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        // Initialize DB table if needed (first call)
        await initDb();

        // Check if user exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "Account already exists with this email" },
                { status: 400 }
            );
        }

        // Create user (hashing handled in lib/db.ts)
        const user = await createUser({ email, name, mobile, password });

        // Generate and send OTP
        const otp = generateOTP();
        storeOTP(email, otp);

        console.log(`REAL DB SIGNUP OTP for ${email}: ${otp}`);

        // Email logic
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: "R2H.AI <onboarding@resend.dev>",
                to: email,
                subject: "Verification for R2H.AI Platform",
                html: generateOTPEmail(otp),
            });
        }

        return NextResponse.json({
            success: true,
            message: "Account created. Please verify via OTP.",
        });

    } catch (error: any) {
        console.error("[SECURITY AUDIT] Signup Crash:", error);
        return NextResponse.json(
            {
                success: false,
                error: "System failure during registration",
                details: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
        );
    }

}
