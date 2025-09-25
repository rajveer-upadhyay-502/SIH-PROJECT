// src/app/dashboard/timetable/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { day: 'Monday', subject: 'Math', time: '10:00 AM' },
    { day: 'Tuesday', subject: 'Physics', time: '11:00 AM' },
  ];

  return NextResponse.json(data);
}
