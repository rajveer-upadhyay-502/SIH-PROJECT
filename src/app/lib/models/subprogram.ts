import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ISubProgram extends Document {
  name: string;
  description?: string;
  programId: string; // Reference to Program
  createdAt: number;
}

const SubProgramSchema = new Schema<ISubProgram>({
  name: { type: String, required: true },
  description: { type: String },
  programId: { type: String, required: true },
  createdAt: { type: Number, required: true },
});

export const SubProgram = models.SubProgram || model<ISubProgram>("SubProgram", SubProgramSchema);
