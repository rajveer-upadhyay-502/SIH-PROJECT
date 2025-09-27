import { connectToDatabase } from "@/app/lib/db";
import { College } from "@/app/lib/models/college";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const newCollege = await College.create(body);

  return NextResponse.json({ success: true, data: newCollege }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const colleges = await College.find();
  return NextResponse.json({ success: true, data: colleges });
}
