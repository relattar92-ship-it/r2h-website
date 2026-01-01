import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otp-store";
import { SignJWT } from "jose";
import { getUserByEmail, verifyUser } from "@/lib/db";

export const dynamic = "force-dynamic";

const JWT_SECRET = new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "r2h_security_secret_2025_silver_platinum"
);


export async function POST(request: NextRequest) {
    try {
        const { email, code } = await request.json();

        if (!email || !code) {
            return NextResponse.json(
                { success: false, error: "Email and code are required" },
                { status: 400 }
            );
        }

        const result = verifyOTP(email, code);

        if (!result.valid) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 401 }
            );
        }

        // Fetch user details for JWT
        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json(
                { success: false, error: "User session lost" },
                { status: 500 }
            );
        }

        // Mark as verified in DB
        await verifyUser(email);

        // Generate JWT with full user sync
        const token = await new SignJWT({
            id: user.id,
            email: user.email,
            name: user.name,
            mobile: user.mobile,
            tier: "senior" // Default or fetched
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(JWT_SECRET);

        const response = NextResponse.json({
            success: true,
            message: "Authentication successful",
        });

        // Set Cookie
        response.cookies.set("r2h_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 2, // 2 hours
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Verify OTP error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}


