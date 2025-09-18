import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    // Check if approved
    if (user.status !== "approved") {
      return NextResponse.json({ error: "User not approved by admin yet." }, { status: 403 });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // TODO: Create session or JWT here

    return NextResponse.json({ message: "Login successful", user: { name: user.name, email: user.email, role: user.role } }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
