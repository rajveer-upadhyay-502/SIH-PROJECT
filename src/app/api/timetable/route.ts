import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    // Optionally filter timetable by collegeId or departmentId using query params
    const url = new URL(request.url);
    const collegeId = url.searchParams.get("collegeId");
    const departmentId = url.searchParams.get("departmentId");

    let q = collection(db, "timetable");
    // If filtering is needed, you can build queries here
    // Example:
    // if (collegeId) q = query(q, where("collegeId", "==", collegeId));

    const snapshot = await getDocs(q);
    const timetableEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(timetableEntries, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch timetable", err);
    return NextResponse.json({ error: "Failed to fetch timetable" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const requiredFields = [
      "collegeId",
      "departmentId",
      "subjectId",
      "dayOfWeek",
      "startTime",
      "endTime",
      "classroomNumber",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
      }
    }

    const docRef = await addDoc(collection(db, "timetable"), {
      ...data,
      createdAt: Date.now(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to add timetable entry", err);
    return NextResponse.json({ error: "Failed to add timetable entry" }, { status: 500 });
  }
}
