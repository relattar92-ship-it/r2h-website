/**
 * In-memory OTP Store
 * In production, replace with Redis or database storage
 */

interface OTPEntry {
    code: string;
    email: string;
    expiresAt: number;
    attempts: number;
}

// In-memory store (will reset on server restart)
// For production, use Redis or database
const otpStore = new Map<string, OTPEntry>();

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(email: string, code: string): void {
    const normalizedEmail = email.toLowerCase().trim();

    // 5 minute expiry
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore.set(normalizedEmail, {
        code,
        email: normalizedEmail,
        expiresAt,
        attempts: 0,
    });

    // Auto-cleanup after expiry
    setTimeout(() => {
        otpStore.delete(normalizedEmail);
    }, 5 * 60 * 1000);
}

export function verifyOTP(email: string, code: string): { valid: boolean; error?: string } {
    const normalizedEmail = email.toLowerCase().trim();
    const entry = otpStore.get(normalizedEmail);

    if (!entry) {
        return { valid: false, error: "No verification code found. Please request a new code." };
    }

    if (Date.now() > entry.expiresAt) {
        otpStore.delete(normalizedEmail);
        return { valid: false, error: "Code has expired. Please request a new code." };
    }

    if (entry.attempts >= 5) {
        otpStore.delete(normalizedEmail);
        return { valid: false, error: "Too many attempts. Please request a new code." };
    }

    if (entry.code !== code) {
        entry.attempts++;
        return { valid: false, error: "Invalid Code" };
    }

    // Success - remove the OTP
    otpStore.delete(normalizedEmail);
    return { valid: true };
}

export function getStoredOTP(email: string): OTPEntry | undefined {
    return otpStore.get(email.toLowerCase().trim());
}
