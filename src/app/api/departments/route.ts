import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "departments"));
    const departments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(departments, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch departments", err);
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.name || !data.collegeId) {
      return NextResponse.json({ error: "Name and collegeId are required." }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "departments"), {
      name: data.name,
      collegeId: data.collegeId,
      createdAt: Date.now(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to add department", err);
    return NextResponse.json({ error: "Failed to add department" }, { status: 500 });
  }
}
