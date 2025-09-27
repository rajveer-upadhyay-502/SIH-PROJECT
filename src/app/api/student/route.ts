// src/app/api/student/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User, IUser, UserRole } from "@/app/lib/models/user";
import { connectToDatabase } from "@/app/lib/db";

function generatePassword(length = 10): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export async function GET(req: Request) {
  await connectToDatabase();

  const url = new URL(req.url);
  const collegeId = url.searchParams.get("collegeId");
  if (!collegeId) {
    return NextResponse.json({ success: false, message: "Missing collegeId" }, { status: 400 });
  }

  const studentList = await User.find({ role: "STUDENT", collegeId });
  return NextResponse.json({ success: true, data: studentList });
}

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();

  const requiredFields = ["name", "email", "collegeId"];
  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json({ success: false, message: `${field} is required` }, { status: 400 });
    }
  }

  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    return NextResponse.json({ success: false, message: "Email already exists" }, { status: 409 });
  }

  const plainPassword = generatePassword();
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const newStudent = new User({
    name: body.name,
    email: body.email,
    hashedPassword,
    role: "STUDENT" as UserRole,
    collegeId: body.collegeId,
    createdAt: Date.now(),
  });

  await newStudent.save();

  return NextResponse.json({
    success: true,
    data: {
      id: newStudent._id,
      name: newStudent.name,
      email: newStudent.email,
      role: newStudent.role,
      collegeId: newStudent.collegeId,
      createdAt: newStudent.createdAt,
      password: plainPassword,
    },
  }, { status: 201 });
}
