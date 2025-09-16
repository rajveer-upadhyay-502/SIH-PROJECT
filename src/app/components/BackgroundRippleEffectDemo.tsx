"use client";
import { BackgroundRippleEffect } from "@/app/components/ui/background-ripple-effect";

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <BackgroundRippleEffect rows={10} cols={30} cellSize={40} />

      {/* Your content here */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
          Welcome to Ripple World
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
          Interactive grid-based ripple animation with full-screen coverage.
        </p>
      </div>
    </div>
  );
}
