import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const dynamic = "force-dynamic";

const JWT_SECRET = new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "r2h_security_lock_2025_silver"
);


export async function GET(request: NextRequest) {
    try {
        const session = request.cookies.get("r2h_session")?.value;

        if (!session) {
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { payload } = await jwtVerify(session, JWT_SECRET);

        return NextResponse.json({
            success: true,
            user: {
                id: payload.id,
                email: payload.email,
                name: payload.name,
                mobile: payload.mobile,
                tier: payload.tier
            }
        });

    } catch (error) {
        console.error("Auth Me API Error:", error);
        return NextResponse.json(
            { success: false, error: "Invalid session" },
            { status: 401 }
        );
    }
}
