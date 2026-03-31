"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const paths = [
      "M-100 -100C100 0 300 100 600 200",
      "M-120 -120C80 -20 280 80 580 180",
      "M-140 -140C60 -40 260 60 560 160",
      "M-160 -160C40 -60 240 40 540 140",
      "M-180 -180C20 -80 220 20 520 120",
      "M-200 -200C0 -100 200 0 500 100",
      "M-220 -220C-20 -120 180 -20 480 80",
    ];

    return (
      <div
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center",
          className,
        )}
      >
        <svg
          className="pointer-events-none absolute h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
        >
          {/* Base faint lines */}
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
            stroke="url(#baseGradient)"
            strokeOpacity="0.15"
            strokeWidth="1"
          />

          {/* Animated beams */}
          {paths.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              stroke={`url(#gradient-${index})`}
              strokeOpacity="0.7"
              strokeWidth="1"
            />
          ))}

          <defs>
            {/* Static gradient */}
            <linearGradient id="baseGradient">
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="50%" stopColor="#6344F5" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>

            {/* Animated gradients */}
            {paths.map((_, index) => (
              <motion.linearGradient
                id={`gradient-${index}`}
                key={index}
                initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["0%", "95%"],
                  y1: ["0%", "100%"],
                  y2: ["0%", "100%"],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <stop stopColor="#18CCFC" stopOpacity="0" />
                <stop stopColor="#18CCFC" />
                <stop offset="50%" stopColor="#6344F5" />
                <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
              </motion.linearGradient>
            ))}
          </defs>
        </svg>
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";
