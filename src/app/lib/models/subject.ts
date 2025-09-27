import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ISubject extends Document {
  name: string;
  code: string;
  description?: string;
  programId: string; // Reference to Program or SubProgram if needed
  credits: number;
  createdAt: number;
}

const SubjectSchema = new Schema<ISubject>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  programId: { type: String, required: true },
  credits: { type: Number, required: true },
  createdAt: { type: Number, required: true },
});

export const Subject = models.Subject || model<ISubject>("Subject", SubjectSchema);
