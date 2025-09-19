export type UserRole = "admin" | "faculty" | "student";
export type UserStatus = "pending" | "approved";

export interface User {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  collegeId?: string;
  departmentId?: string;
  facultyId?: string;
  studentId?: string;
  subprogramId?: string;
  courseIds?: string[];
  createdAt: number;
}
