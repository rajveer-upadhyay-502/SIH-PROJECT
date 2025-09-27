import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ICollege extends Document {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  totalClassrooms: number;
  totalLabs: number;
  workingHoursPerDay: number;
  lectureDurationMinutes: number;
  adminUserId: string;
  createdAt: number;
}

const CollegeSchema = new Schema<ICollege>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: Number, required: true },
  totalClassrooms: { type: Number, required: true },
  totalLabs: { type: Number, required: true },
  workingHoursPerDay: { type: Number, required: true },
  lectureDurationMinutes: { type: Number, required: true },
  adminUserId: { type: String, required: true },
  createdAt: { type: Number, required: true },
});

export const College = models.College || model<ICollege>("College", CollegeSchema);
