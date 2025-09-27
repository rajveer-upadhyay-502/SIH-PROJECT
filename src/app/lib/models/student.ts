import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  collegeId: string;
  enrollmentYear: number;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  departmentId: { type: String, required: true },
  collegeId: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
});

export const Student = models.Student || model<IStudent>("Student", StudentSchema);
