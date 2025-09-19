// app/api/user/register/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
      role,
      collegeId,
      departmentId,
      courseId,
      subprogramId,
    } = await req.json();

    if (!name || !email || !password || !role || !collegeId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!["faculty", "student"].includes(role)) {
      return NextResponse.json({ error: "Role must be faculty or student" }, { status: 400 });
    }

    const usersRef = collection(db, "users");

    // Check email uniqueness
    const qEmail = query(usersRef, where("email", "==", email));
    const existingUsers = await getDocs(qEmail);
    if (!existingUsers.empty) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      name,
      email,
      passwordHash,
      role,
      collegeId,
      departmentId: departmentId || null,
      courseId: courseId || null,
      subprogramId: subprogramId || null,
      status: "pending",
      createdAt: Date.now(),
    };

    const addedDoc = await addDoc(usersRef, newUser);

    return NextResponse.json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      userId: addedDoc.id,
    }, { status: 201 });

  } catch (error) {
    console.error("User registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
