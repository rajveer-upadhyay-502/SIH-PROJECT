// /src/lib/models.ts

export type UserRole = "admin" | "faculty" | "student";
export type UserStatus = "pending" | "approved";

export interface User {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  collegeId?: string;
  status: UserStatus;
  createdAt: number;
}

export interface College {
  id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  totalClassrooms: number;
  totalLabs: number;
  adminUserId: string;
  createdAt: number;
}

export interface Department {
  id?: string;
  name: string;
  collegeId: string;
  createdAt: number;
}

export interface Subject {
  id?: string;
  name: string;
  departmentId: string;
  createdAt: number;
}

export interface TimetableEntry {
  id?: string;
  collegeId: string;
  departmentId: string;
  subjectId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  classroomNumber: string;
  createdAt: number;
}
