import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IFaculty extends Document {
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  collegeId: string;
}

const FacultySchema = new Schema<IFaculty>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  departmentId: { type: String, required: true },
  collegeId: { type: String, required: true },
});

export const Faculty = models.Faculty || model<IFaculty>("Faculty", FacultySchema);
