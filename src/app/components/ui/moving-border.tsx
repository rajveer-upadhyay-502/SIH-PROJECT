"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/app/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-600 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.93)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx = "30%",
  ry = "30%",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      // px per ms to complete one loop in `duration` ms
      const pxPerMillisecond = length / duration;
      // Animate progress in a loop
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) =>
    pathRef.current ? pathRef.current.getPointAtLength(val).x : 0
  );
  const y = useTransform(progress, (val) =>
    pathRef.current ? pathRef.current.getPointAtLength(val).y : 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  // Create rounded rect path string
  // Use rx and ry as percentage or absolute, fallback to pixels
  // For simplicity, let's hardcode the rect width/height to 100%
  // (SVG viewBox is 100x100 units)
  // Adjust rx/ry accordingly.

  const rxValue = rx.endsWith("%")
    ? (parseFloat(rx) / 100) * 50
    : parseFloat(rx);
  const ryValue = ry.endsWith("%")
    ? (parseFloat(ry) / 100) * 50
    : parseFloat(ry);

  // Rounded rectangle path in 100x100 box
  const d = `
    M ${rxValue},0
    H ${100 - rxValue}
    A ${rxValue} ${ryValue} 0 0 1 100 ${ryValue}
    V ${100 - ryValue}
    A ${rxValue} ${ryValue} 0 0 1 ${100 - rxValue} 100
    H ${rxValue}
    A ${rxValue} ${ryValue} 0 0 1 0 ${100 - ryValue}
    V ${ryValue}
    A ${rxValue} ${ryValue} 0 0 1 ${rxValue} 0
    Z
  `;

  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute h-full w-full"
        {...otherProps}
      >
        <path
          d={d}
          fill="none"
          stroke="transparent"
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
