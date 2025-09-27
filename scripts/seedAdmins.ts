import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { User } from "../src/app/lib/models/user";


dotenv.config();

async function seedAdmins() {
  await mongoose.connect(process.env.MONGODB_URI!);

  const admins = [
    {
      name: "Admin One",
      email: "admin1@college.edu",
      password: "securePassword1",
      collegeId: "collegeObjectId1",
    },
    {
      name: "Admin Two",
      email: "admin2@college.edu",
      password: "securePassword2",
      collegeId: "collegeObjectId2",
    },
  ];

  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    const userExists = await User.findOne({ email: admin.email });
    if (userExists) {
      console.log(`User ${admin.email} already exists, skipping...`);
      continue;
    }

    const newAdmin = new User({
      name: admin.name,
      email: admin.email,
      hashedPassword,
      role: "ADMIN",
      collegeId: admin.collegeId,
      createdAt: Date.now(),
    });

    await newAdmin.save();
    console.log(`Admin user created: ${admin.email}`);
  }

  mongoose.disconnect();
}

seedAdmins().catch(console.error);
