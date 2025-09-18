import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { doc, updateDoc } from "firebase/firestore";

export async function PATCH(request: Request) {
  try {
    const { userId, status } = await request.json();

    if (!userId || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { status });

    return NextResponse.json({ message: `User ${status} successfully.` });
  } catch (error) {
    console.error("Approve user error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
