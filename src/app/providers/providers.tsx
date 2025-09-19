// src/app/Providers.tsx
"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/app/context/AuthContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
