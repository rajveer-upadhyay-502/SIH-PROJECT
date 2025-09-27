import { connectToDatabase } from "@/app/lib/db";
import { Subject } from "@/app/lib/models/subject";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const newSubject = await Subject.create(body);

  return NextResponse.json({ success: true, data: newSubject }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const subjects = await Subject.find();
  return NextResponse.json({ success: true, data: subjects });
}
