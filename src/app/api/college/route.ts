import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      pincode,
      totalClassrooms,
      totalLabs,
    } = await req.json();

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !totalClassrooms ||
      !totalLabs
    ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if email already exists
    const collegesRef = collection(db, "colleges");
    const q = query(collegesRef, where("email", "==", email));
    const existingColleges = await getDocs(q);

    if (!existingColleges.empty) {
      return NextResponse.json({ error: "College with this email already exists" }, { status: 409 });
    }

    // Add new college document
    const newCollegeRef = await addDoc(collegesRef, {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      pincode: String(pincode),
      totalClassrooms: Number(totalClassrooms),
      totalLabs: Number(totalLabs),
      createdAt: Date.now(),
    });

    return NextResponse.json({
      message: "College registered successfully",
      collegeId: newCollegeRef.id,
    }, { status: 201 });

  } catch (error) {
    console.error("College registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
