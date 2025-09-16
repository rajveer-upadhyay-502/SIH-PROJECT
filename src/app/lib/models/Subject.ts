import mongoose, { Schema, model, models } from "mongoose";

const SubjectSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true }, // e.g., "MATH101"
    description: { type: String },
    institutionId: { type: Schema.Types.ObjectId, ref: "Institution", required: true },
    teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }], // teachers assigned
    credits: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export default models.Subject || model("Subject", SubjectSchema);
