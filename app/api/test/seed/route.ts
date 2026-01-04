// app/api/test/seed/route.ts
import { NextRequest, NextResponse } from "next/server";
import { initDb, seedDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  // Protect this route from being called in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ success: false, error: 'This endpoint is not available in production.' }, { status: 403 });
  }

  try {
    console.log('TEST SEED: Initializing and seeding database...');
    await initDb();
    await seedDb();
    console.log('TEST SEED: Database seeded successfully.');
    return NextResponse.json({ success: true, message: 'Database seeded successfully.' });
  } catch (error: any) {
    console.error('TEST SEED: Error seeding database:', error);
    return NextResponse.json({ success: false, error: 'Failed to seed database.', details: error.message }, { status: 500 });
  }
}
