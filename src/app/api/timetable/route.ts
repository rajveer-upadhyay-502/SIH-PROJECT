import { connectToDatabase } from "@/app/lib/db";
import { Timetable } from "@/app/lib/models/timetable";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const newTimetable = await Timetable.create(body);

  return NextResponse.json({ success: true, data: newTimetable }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const timetables = await Timetable.find();
  return NextResponse.json({ success: true, data: timetables });
}
