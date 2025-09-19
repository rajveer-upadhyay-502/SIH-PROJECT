import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, collegeId } = await req.json();

    if (!name || !email || !password || !role || !collegeId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if admin with same email exists
    const adminsRef = collection(db, "admins");
    const q = query(adminsRef, where("email", "==", email));
    const existingAdmins = await getDocs(q);

    if (!existingAdmins.empty) {
      return NextResponse.json({ error: "Admin with this email already exists" }, { status: 409 });
    }

    // Add new admin document
    const newAdminRef = await addDoc(adminsRef, {
      name,
      email,
      password, // Ideally, hash password before saving!
      role,
      collegeId,
      createdAt: Date.now(),
    });

    return NextResponse.json({
      message: "Admin registered successfully",
      adminId: newAdminRef.id,
    }, { status: 201 });

  } catch (error) {
    console.error("Admin registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
