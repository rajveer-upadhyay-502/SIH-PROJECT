import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/app/lib/models/user";
import { connectToDatabase } from "@/app/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = params;
  const user = await User.findById(id);

  if (!user || user.role !== "STUDENT") {
    return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: user });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = params;
  const body = await req.json();

  const user = await User.findById(id);
  if (!user || user.role !== "STUDENT") {
    return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
  }

  // Prevent changing role or collegeId
  if (body.role || body.collegeId) {
    return NextResponse.json({ success: false, message: "Cannot change role or collegeId" }, { status: 400 });
  }

  if (body.password) {
    body.hashedPassword = await bcrypt.hash(body.password, 10);
    delete body.password;
  }

  Object.assign(user, body);
  await user.save();

  return NextResponse.json({ success: true, data: user });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = params;
  const user = await User.findById(id);

  if (!user || user.role !== "STUDENT") {
    return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
  }

  await user.deleteOne();
  return NextResponse.json({ success: true, message: "Student deleted" });
}
