export interface Student {
  id?: string;
  userId: string; // Reference to users collection
  name: string;
  email: string;
  departmentId: string;
  subprogramId: string;
  currentSemester: number;
  createdAt: number;
}
