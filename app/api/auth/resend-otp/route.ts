import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/db";
import { generateOTP, storeOTP } from "@/lib/otp-store";
import { Resend } from "resend";
import { generateOTPEmail } from "@/lib/email-template";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json(
                { success: false, error: "Identity not recognized" },
                { status: 404 }
            );
        }

        // Generate and store OTP
        const otp = generateOTP();
        storeOTP(email, otp);

        console.log(`[RESEND] OTP for ${email}: ${otp}`);

        // Email logic
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: "R2H.AI <onboarding@resend.dev>",
                to: email,
                subject: "New Verification Code - R2H.AI",
                html: generateOTPEmail(otp),
            });
        }

        return NextResponse.json({
            success: true,
            message: "New code sent successfully",
        });

    } catch (error) {
        console.error("Resend OTP Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to resend code" },
            { status: 500 }
        );
    }
}
