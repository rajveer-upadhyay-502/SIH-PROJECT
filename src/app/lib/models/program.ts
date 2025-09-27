import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IProgram extends Document {
  name: string;
  description?: string;
  collegeId: string;  // Reference to College
  createdAt: number;
}

const ProgramSchema = new Schema<IProgram>({
  name: { type: String, required: true },
  description: { type: String },
  collegeId: { type: String, required: true },
  createdAt: { type: Number, required: true },
});

export const Program = models.Program || model<IProgram>("Program", ProgramSchema);
