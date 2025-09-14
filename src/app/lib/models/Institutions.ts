import mongoose, { Schema, Document, Model } from "mongoose";

// 1. TypeScript Interface for Institution document
export interface IInstitution extends Document {
  name: string;
  email: string;
  timezone: string;
}

// 2. Institution Schema
const InstitutionSchema = new Schema<IInstitution>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    timezone: { type: String, default: "Asia/Kolkata" },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt fields
  }
);

// 3. Export typed model
const Institution: Model<IInstitution> =
  mongoose.models.Institution || mongoose.model<IInstitution>("Institution", InstitutionSchema);

export default Institution;
