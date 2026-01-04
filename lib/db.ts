import { Pool } from "pg";
import bcrypt from "bcryptjs";

if (!process.env.DATABASE_URL) {
    console.error("CRITICAL: DATABASE_URL is not defined in environment variables!");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});


export interface User {
    id: string;
    email: string;
    name: string;
    mobile: string;
    password_hash: string;
    is_verified: boolean;
    created_at: Date;
}

/**
 * Ensures the users table exists.
 * In a real production environment, you'd use migrations (Prisma/Drizzle/Kysely).
 */
export async function initDb() {
    console.log("[DATABASE] Initializing schema...");
    let client;
    try {
        client = await pool.connect();
        console.log("[DATABASE] Connection established.");
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                mobile TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                is_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("[DATABASE] Table 'users' verified/created.");
    } catch (err: any) {
        console.error("[DATABASE] Initialization FAILURE:", err.message);
        throw err; // Re-throw to trigger 500 with details
    } finally {
        if (client) client.release();
    }
}

/**
 * Seeds the database with initial data for testing/development.
 */
export async function seedDb() {
    console.log("[DATABASE] Seeding initial data...");
    let client;
    try {
        client = await pool.connect();
        // Check if the user already exists
        const existingUser = await client.query("SELECT * FROM users WHERE email = $1", ["existing@example.com"]);
        if (existingUser.rows.length === 0) {
            const passwordHash = await bcrypt.hash("password123", 10);
            await client.query(
                "INSERT INTO users (email, name, mobile, password_hash, is_verified) VALUES ($1, $2, $3, $4, $5)",
                ["existing@example.com", "Existing User", "+11234567890", passwordHash, true]
            );
            console.log("[DATABASE] Seeded user 'existing@example.com'.");
        } else {
            console.log("[DATABASE] User 'existing@example.com' already exists.");
        }
    } catch (err: any) {
        console.error("[DATABASE] Seeding FAILURE:", err.message);
        // Don't re-throw here, as it might crash the app start
    } finally {
        if (client) client.release();
    }
}


export async function getUserByEmail(email: string): Promise<User | undefined> {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [email.toLowerCase().trim()]);
    return res.rows[0];
}

export async function createUser({ email, name, mobile, password }: { email: string; name: string; mobile: string; password: string }): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 10);
    const res = await pool.query(
        "INSERT INTO users (email, name, mobile, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
        [email.toLowerCase().trim(), name, mobile, passwordHash]
    );
    return res.rows[0];
}

export async function verifyUser(email: string): Promise<void> {
    await pool.query("UPDATE users SET is_verified = TRUE WHERE email = $1", [email.toLowerCase().trim()]);
}

export default pool;
