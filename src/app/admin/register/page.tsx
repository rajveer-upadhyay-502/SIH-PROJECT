"use client";

import { useSearchParams } from "next/navigation";
import AdminRegisterForm from "@/app/components/AdminRegisterForm";

export default function AdminRegisterPage() {
  const searchParams = useSearchParams();
  const collegeId = searchParams.get("collegeId");

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Register Page</h1>
      <AdminRegisterForm collegeId={collegeId} />
    </div>
  );
}
