import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "r2h_security_secret_2025_silver_platinum"
);


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /dashboard routes
    if (pathname.startsWith("/dashboard")) {
        const session = request.cookies.get("r2h_session")?.value;

        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        try {
            await jwtVerify(session, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            console.error("JWT Verification failed:", error);
            const response = NextResponse.redirect(new URL("/auth/login", request.url));
            response.cookies.delete("r2h_session");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
