export interface TimetableEntry {
  id?: string;
  collegeId: string;
  departmentId: string;
  subprogramId: string;
  semester: number;
  subjectId: string;
  facultyId: string;
  dayOfWeek: string; // e.g., "Monday"
  startTime: string; // Format: "HH:mm"
  endTime: string;   // Format: "HH:mm"
  classroomNumber: string;
  createdAt: number;
}
