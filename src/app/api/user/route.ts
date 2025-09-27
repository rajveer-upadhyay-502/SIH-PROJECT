import { connectToDatabase } from "@/app/lib/db";
import { User } from "@/app/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  // You should hash password before saving — example: bcrypt.hash(body.password, saltRounds)
  const newUser = await User.create(body);

  return NextResponse.json({ success: true, data: newUser }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const users = await User.find().select("-hashedPassword"); // never return password hash
  return NextResponse.json({ success: true, data: users });
}
