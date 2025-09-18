import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { User, UserRole, UserStatus } from "@/app/lib/models";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, email, password, role, collegeId } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!["admin", "faculty", "student"].includes(role)) {
      return NextResponse.json({ error: "Invalid user role." }, { status: 400 });
    }

    // Check if email already exists
    const usersRef = collection(db, "users");
    const qEmail = query(usersRef, where("email", "==", email));
    const existingUsers = await getDocs(qEmail);
    if (!existingUsers.empty) {
      return NextResponse.json({ error: "Email already registered." }, { status: 400 });
    }

    // For admin: check if any admin already exists
    let isNewAdmin = false;
    if (role === "admin") {
      const qAdmin = query(usersRef, where("role", "==", "admin"));
      const existingAdmins = await getDocs(qAdmin);
      if (existingAdmins.empty) {
        // No admin exists yet → this is new admin
        isNewAdmin = true;
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // For admin: auto approve, others: pending
    const status: UserStatus = role === "admin" ? "approved" : "pending";

    // Prepare user data
    const userData: User = {
      name,
      email,
      passwordHash,
      role,
      collegeId: collegeId || "",
      status,
      createdAt: Date.now(),
    };

    await addDoc(usersRef, userData);

    return NextResponse.json({
      message: `User registered successfully. Status: ${status}`,
      isNewAdmin,
    });
  } catch (error) {
    console.error("Register user error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
