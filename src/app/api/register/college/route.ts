// app/api/register/college/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
      password,
    } = body;

    // Convert numeric fields to numbers
    const pincodeNum = Number(pincode);
    const totalClassroomsNum = Number(totalClassrooms);
    const totalLabsNum = Number(totalLabs);

    // Validation (timezone removed)
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !country ||
      !pincodeNum ||
      !totalClassroomsNum ||
      !totalLabsNum ||
      !password
    ) {
      return NextResponse.json(
        { error: "All fields are required and must be valid" },
        { status: 400 }
      );
    }

    // Check if college already exists (by email)
    const institutionsRef = collection(db, "institutions");
    const q = query(institutionsRef, where("email", "==", email));
    const existingSnap = await getDocs(q);

    if (!existingSnap.empty) {
      return NextResponse.json(
        { error: "College already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new institution
    const newDoc = await addDoc(institutionsRef, {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      pincode: pincodeNum,
      totalClassrooms: totalClassroomsNum,
      totalLabs: totalLabsNum,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        college: {
          id: newDoc.id,
          name,
          email,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in /api/register/college POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
