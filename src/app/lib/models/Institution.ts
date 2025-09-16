import mongoose, { Schema, model, models } from "mongoose";

const InstitutionSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    timezone: { type: String, required: true },
    totalClassrooms: { type: Number, required: true },
    totalLabs: { type: Number, required: true },
    password: { type: String, required: true }, // hashed password
  },
  { timestamps: true }
);

export default models.Institution || model("Institution", InstitutionSchema);
