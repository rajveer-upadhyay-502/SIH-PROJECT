import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "subjects"));
    const subjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(subjects, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch subjects", err);
    return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.name || !data.departmentId) {
      return NextResponse.json({ error: "Name and departmentId are required." }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "subjects"), {
      name: data.name,
      departmentId: data.departmentId,
      createdAt: Date.now(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to add subject", err);
    return NextResponse.json({ error: "Failed to add subject" }, { status: 500 });
  }
}
