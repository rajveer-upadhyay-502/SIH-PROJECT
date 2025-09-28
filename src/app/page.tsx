"use client";

import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect";
import { Button } from "@/app/components/ui/moving-border";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      {/* Background Ripple Layer */}
      <BackgroundRippleEffect />

      {/* Foreground UI */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pointer-events-none">
        {/* Text Content — allows clicks to pass through */}
        <div className="text-center px-4 mb-30">
          <div className="mb-6 bg-opacity-70 p-6 rounded-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to EduManage
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              A complete solution for managing institutions, teachers, students,
              and classrooms – all in one platform.
            </p>
          </div>

          {/* Only Button is Clickable */}
          <div className="mt-6 max-w-md mx-auto pointer-events-auto">
            <Button
              duration={4000}
              className="w-full px-7 font-serif cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Generate Timetable Now!
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
