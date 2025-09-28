import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import ContactMessage from "@/app/lib/models/ContactMessage";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newMessage = await ContactMessage.create({ name, email, message });
    console.log("✔️ Saved to DB:", newMessage);

    return NextResponse.json(
      { success: true, data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
