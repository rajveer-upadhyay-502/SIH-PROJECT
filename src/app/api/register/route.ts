import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/lib/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role = "STUDENT", institutionId } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let institutionObjectId = undefined;
    if (institutionId) {
      if (!mongoose.Types.ObjectId.isValid(institutionId)) {
        return NextResponse.json(
          { error: "Invalid institutionId format." },
          { status: 400 }
        );
      }
      institutionObjectId = new mongoose.Types.ObjectId(institutionId);
    }

    const newUser = await User.create({
      name,
      email,
      hashedPassword,
      role,
      institutionId: institutionObjectId,
    });

    return NextResponse.json(
      {
        message: "User registered successfully.",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          institutionId: newUser.institutionId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
