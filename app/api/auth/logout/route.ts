import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: "Logged out",
    });

    response.cookies.set("r2h_session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
        path: "/",
    });

    return response;
}
