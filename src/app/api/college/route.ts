// app/api/college/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { College } from "@/app/lib/models/college";

const getAdminUserIdFromHeader = (req: NextRequest): string | null => {
  return req.headers.get("x-admin-user-id");
};

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const adminUserId = getAdminUserIdFromHeader(req);
  if (!adminUserId) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const college = await College.findOne({ adminUserId });
  return NextResponse.json({ success: true, college });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();
  const { adminUserId } = body;

  if (!adminUserId) {
    return NextResponse.json({ success: false, message: "Missing adminUserId" }, { status: 400 });
  }

  const existing = await College.findOne({ adminUserId });
  if (existing) {
    return NextResponse.json({ success: false, message: "College already exists for this admin." }, { status: 409 });
  }

  // Validate required fields
  const requiredFields = [
    "name",
    "address",
    "city",
    "state",
    "country",
    "pincode",
    "totalClassrooms",
    "totalLabs",
    "workingHoursPerDay",
    "lectureDurationMinutes",
  ];
  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json({ success: false, message: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const college = await College.create({
    ...body,
    adminUserId,
    createdAt: Date.now(),
  });

  return NextResponse.json({ success: true, college });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();
  const { adminUserId } = body;

  if (!adminUserId) {
    return NextResponse.json({ success: false, message: "Missing adminUserId" }, { status: 400 });
  }

  const college = await College.findOneAndUpdate({ adminUserId }, body, {
    new: true,
    runValidators: true,
  });

  if (!college) {
    return NextResponse.json({ success: false, message: "College not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, college });
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();
  const { adminUserId } = body;

  if (!adminUserId) {
    return NextResponse.json({ success: false, message: "Missing adminUserId" }, { status: 400 });
  }

  const result = await College.findOneAndDelete({ adminUserId });

  if (!result) {
    return NextResponse.json({ success: false, message: "College not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "College deleted" });
}
