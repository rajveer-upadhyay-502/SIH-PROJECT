"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/app/components/ui/background-ripple-effect";

export function BackgroundRippleEffectDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden bg-white dark:bg-black">
      <BackgroundRippleEffect rows={10} cols={30} cellSize={40} />
      <div className="mt-60 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Interactive Background Boxes Ripple Effect
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          Hover over the boxes above and click. Use this on background sections,
          but please don&apos;t go overboard!
        </p>
      </div>
    </div>
  );
}
