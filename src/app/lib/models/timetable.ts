import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ITimetable extends Document {
  programId: string;
  subProgramId?: string; // Optional, if timetable is for subprogram
  dayOfWeek: string; // e.g. "Monday", "Tuesday"
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "10:00"
  subjectId: string;
  facultyId: string;
  createdAt: number;
}

const TimetableSchema = new Schema<ITimetable>({
  programId: { type: String, required: true },
  subProgramId: { type: String },
  dayOfWeek: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  subjectId: { type: String, required: true },
  facultyId: { type: String, required: true },
  createdAt: { type: Number, required: true },
});

export const Timetable = models.Timetable || model<ITimetable>("Timetable", TimetableSchema);
