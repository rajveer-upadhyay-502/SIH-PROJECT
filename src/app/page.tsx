"use client";

import { NavbarDemo } from "@/app/components/NavbarDemo";
import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect";
export default function HomePage() {
  return (
    <>
      <BackgroundRippleEffect />
      <div className="relative z-10">
        <NavbarDemo />
        <div className="text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to EduManage
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            A complete solution for managing institutions, teachers, students, and classrooms – all in one platform.
          </p>
        </div>
      </div>
    </>
  );
}
