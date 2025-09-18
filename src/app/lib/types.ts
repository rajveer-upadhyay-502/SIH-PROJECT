import { UserStatus } from "./models";

export type UserRole = "admin" | "faculty" | "student";

export interface User {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole; // 'admin', 'faculty', 'student'
  collegeId?: string; // link to college doc id
  status: UserStatus; // approved / pending
  createdAt: number;
}


export interface College {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  totalClassrooms: number;
  totalLabs: number;
  password: string;
}
