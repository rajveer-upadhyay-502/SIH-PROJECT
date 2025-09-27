import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description?: string;
  collegeId: string;
}

const DepartmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true },
  description: { type: String },
  collegeId: { type: String, required: true }, // or Schema.Types.ObjectId if you prefer
});

export const Department = models.Department || model<IDepartment>("Department", DepartmentSchema);
