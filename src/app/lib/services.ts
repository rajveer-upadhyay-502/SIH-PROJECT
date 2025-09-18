// /src/lib/services.ts

import { db } from "./db";
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import type { College } from "./models";

export async function registerCollege(adminUserId: string, collegeData: Omit<College, "id" | "createdAt">) {
  const collegeRef = doc(collection(db, "colleges"));
  const collegePayload = {
    ...collegeData,
    adminUserId,
    createdAt: Date.now(),
  };
  await setDoc(collegeRef, collegePayload);

  const adminRef = doc(db, "users", adminUserId);
  await updateDoc(adminRef, { collegeId: collegeRef.id });

  return collegeRef.id;
}
