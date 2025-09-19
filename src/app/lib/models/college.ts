export interface College {
  id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode:number;
  totalClassrooms: number;
  totalLabs: number;
  workingHoursPerDay: number;
  lectureDurationMinutes: number;
  adminUserId: string;
  createdAt: number;
}
