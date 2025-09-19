"use client";

import { NavbarDemo } from "@/app/components/NavbarDemo";
import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect";
import { Button } from "@/app/components/ui/moving-border";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <BackgroundRippleEffect />
      <div className="relative z-10">
        
        <div className="mt-25 text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to EduManage
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            A complete solution for managing institutions, teachers, students,
            and classrooms – all in one platform.
          </p>

          {/* Your Button here */}
          <div className="mt-10 inline-block w-full max-w-lg">
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
