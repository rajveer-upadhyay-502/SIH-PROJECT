import { connectToDatabase } from "@/app/lib/db";
import { Department } from "@/app/lib/models/deparment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const newDepartment = await Department.create(body);

  return NextResponse.json({ success: true, data: newDepartment }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const departments = await Department.find();
  return NextResponse.json({ success: true, data: departments });
}
