import mongoose, { Schema, model, models } from "mongoose";

const ClassroomSchema = new Schema(
  {
    name: { type: String, required: true }, // e.g., "Room 101", "Lab A"
    institutionId: { type: Schema.Types.ObjectId, ref: "Institution", required: true },
    capacity: { type: Number, default: 30 }, // optional
    type: { type: String, enum: ["Classroom", "Lab"], default: "Classroom" },
    resources: { type: [String], default: [] }, // e.g., ["Projector", "Whiteboard"]
  },
  { timestamps: true }
);

export default models.Classroom || model("Classroom", ClassroomSchema);
