import { connectToDatabase } from "@/app/lib/db";
import { SubProgram } from "@/app/lib/models/subprogram";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const newSubProgram = await SubProgram.create(body);

  return NextResponse.json({ success: true, data: newSubProgram }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const subPrograms = await SubProgram.find();
  return NextResponse.json({ success: true, data: subPrograms });
}
