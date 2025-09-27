// src/app/api/faculty/route.ts
import { NextResponse } from "next/server";
import { User } from "@/app/lib/models/user";
import { connectToDatabase } from "@/app/lib/db";

export async function GET(req: Request) {
  await connectToDatabase();

  const url = new URL(req.url);
  const collegeId = url.searchParams.get("collegeId");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const search = url.searchParams.get("search") || "";

  if (!collegeId) {
    return NextResponse.json({ success: false, message: "Missing collegeId" }, { status: 400 });
  }

  const query = {
    role: "FACULTY",
    collegeId,
    ...(search && {
      name: { $regex: search, $options: "i" },
    }),
  };

  const total = await User.countDocuments(query);
  const faculties = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-hashedPassword"); // Don't expose password hash

  return NextResponse.json({
    success: true,
    data: faculties,
    total,
    page,
    limit,
  });
}

