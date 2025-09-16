import mongoose, { Schema, model, models } from "mongoose";

const TeacherSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed password
    role: {
      type: String,
      enum: ["ADMIN", "TEACHER", "STUDENT"],
      default: "TEACHER",
    },
    institutionId: { type: Schema.Types.ObjectId, ref: "Institution", required: true },
    department: { type: String }, // Optional field for department
    phone: { type: String }, // Optional contact number
  },
  { timestamps: true }
);

export default models.Teacher || model("Teacher", TeacherSchema);
