import mongoose from "mongoose";
// app/types/next-auth.d.ts (or wherever you keep your types)

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "ADMIN" | "TEACHER" | "STUDENT";
      institutionId: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "TEACHER" | "STUDENT";
    institutionId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "TEACHER" | "STUDENT";
    institutionId: string;
  }
}

declare global {
  // Avoids TypeScript redeclaration errors in Next.js hot reload
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export {};
