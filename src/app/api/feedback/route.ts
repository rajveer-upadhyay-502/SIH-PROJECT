import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import Feedback from "@/app/lib/models/feedback";

export async function GET() {
  try {
    await connectToDatabase();
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feedbacks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();

    const newFeedback = await Feedback.create({ name, email, message });

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
