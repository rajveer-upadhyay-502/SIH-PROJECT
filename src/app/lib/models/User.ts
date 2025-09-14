import mongoose, { Schema, Document, Types, Model } from "mongoose";

// 1. Define interface extending mongoose.Document
export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  institutionId: Types.ObjectId;
}

// 2. Define Schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "TEACHER", "STUDENT"],
      default: "ADMIN",
    },
    institutionId: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
      required: false, // optional unless needed
    },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt
  }
);

// 3. Export model with type safety
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
