"use client";
import React from "react";
import { useShowDates } from "@/providers/showDateProvider";

export default function DateInput() {
  const { showDates, setShowDates } = useShowDates();
  return (
    <div
      className="w-12 h-6 rounded-xl bg-[#FFB7B8] relative cursor-pointer"
      onClick={() => setShowDates((state) => !state)}
    >
      <div
        className={`absolute mx-[2px] z-10 h-[85%] rounded-full aspect-square top-[50%] -translate-y-1/2 bg-white ${
          showDates ? "right-0" : "left-0"
        } transition-all`}
      ></div>
    </div>
  );
}
