import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail, initDb } from "@/lib/db";
import { generateOTP, storeOTP } from "@/lib/otp-store";
import { Resend } from "resend";
import { generateOTPEmail } from "@/lib/email-template";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        await initDb();
        const user = await getUserByEmail(email);

        console.log(`[SECURITY AUDIT] Login attempt for email: ${email}`);

        if (!user) {
            console.log(`[SECURITY AUDIT] Result: FAILURE - User not found in database.`);
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        console.log(`[SECURITY AUDIT] User identified. Verifying password...`);
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        console.log(`[SECURITY AUDIT] Password match result: ${passwordMatch}`);

        if (!passwordMatch) {
            console.log(`[SECURITY AUDIT] Result: FAILURE - Password mismatch for ${email}`);
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        console.log(`[SECURITY AUDIT] Result: SUCCESS - Password accepted. Generating OTP...`);

        // Logic valid -> generate OTP
        const otp = generateOTP();
        storeOTP(email, otp);

        console.log(`[SECURITY AUDIT] OTP created: ${otp}`);


        // Try to send email
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: "R2H.AI <onboarding@resend.dev>",
                to: email,
                subject: "Verification for R2H.AI Platform",
                html: generateOTPEmail(otp),
            });
            console.log(`[SECURITY AUDIT] OTP email sent via Resend.`);
        } else {
            console.log(`[SECURITY AUDIT] WARNING: RESEND_API_KEY not found. Direct OTP access: ${otp}`);
        }


        return NextResponse.json({
            success: true,
            message: "Credentials verified. OTP sent.",
        });

    } catch (error: any) {
        console.error("[SECURITY AUDIT] Login Crash:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Internal server error",
                details: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
        );
    }

}

