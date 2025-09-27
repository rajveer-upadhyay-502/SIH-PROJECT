import { connectToDatabase } from "@/app/lib/db";
import { Program } from "@/app/lib/models/program";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const newProgram = await Program.create(body);

  return NextResponse.json({ success: true, data: newProgram }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const programs = await Program.find();
  return NextResponse.json({ success: true, data: programs });
}
