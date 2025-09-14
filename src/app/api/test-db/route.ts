import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";

export async function GET() {
  console.log("🧪 API /test-db called");
  try {
    await connectToDatabase();
    console.log("✅ MongoDB connected inside test-db route!");
    return NextResponse.json({ message: "DB connected!" });
  } catch (err) {
    console.error("❌ DB connection error inside test-db route:", err);
    return NextResponse.json({ error: "DB connection failed" }, { status: 500 });
  }
}
