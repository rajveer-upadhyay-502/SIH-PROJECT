export interface Faculty {
  id?: string;
  userId: string; // Reference to users collection
  departmentId: string;
  subjectExpertise: string[]; // Array of subject IDs
  createdAt: number;
}
