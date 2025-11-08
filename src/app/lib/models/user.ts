// app/lib/models/user.ts (or admin.ts)

import mongoose, { Schema, Document, models, model } from "mongoose";

export type UserRole = "ADMIN" | "FACULTY" | "STUDENT";

export interface IUser extends Document {
    _id: string;
  name: string;
  email: string;
  hashedPassword: string;
  role: UserRole;
  collegeId: string;  // Link to College
  createdAt: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "FACULTY", "STUDENT"], required: true },
  collegeId: { type: String, required: true },
  createdAt: { type: Number, required: true },
});

export const User = models.User || model<IUser>("User", UserSchema);
